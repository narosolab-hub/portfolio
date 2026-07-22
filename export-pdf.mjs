// 제출용 PDF (이미지 방식).
// 각 라우트를 export 모드로 렌더한 뒤, 실제 화면을 세로로 스크린샷해서
// "콘텐츠가 없는 가로 여백 밴드"에서만 A4 페이지 단위로 잘라 붙인다.
// CSS 재페이지네이션(reflow)을 전혀 쓰지 않으므로 flex/grid 레이아웃이
// 절대 붕괴하지 않고, 섹션은 블록 사이 안전한 지점에서만 끊긴다.
import puppeteer from "puppeteer-core";
import { PDFDocument } from "pdf-lib";
import { writeFile, mkdir } from "node:fs/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:5173";
const OUT = "/Users/kasey/Desktop/취업_26/portfolio-repo/focus-media-pdf";
const FINAL = `${OUT}/포커스미디어-포트폴리오.pdf`;

const routes = [
  "/focus-media?export=1",
  "/focus-media/b2b-platform?export=1",
  "/focus-media/sub-projects?export=1",
];

// A4 지면(mm)
const PAGE_W_MM = 210;
const PAGE_H_MM = 297;
const MARGIN_MM = 14;
const CONTENT_W_MM = PAGE_W_MM - MARGIN_MM * 2; // 182
const CONTENT_H_MM = PAGE_H_MM - MARGIN_MM * 2; // 269
const PT_PER_MM = 72 / 25.4;

// 렌더 폭(CSS px). tile__inner(max 880) + tile padding 24*2 = 928.
const W = 928;
const DSF = 2; // 선명한 텍스트를 위해 2배 해상도로 캡처
// 한 페이지에 담기는 '열' 높이(CSS px): 지면 비율로 환산
const PAGE_COL_H = Math.floor(W * (CONTENT_H_MM / CONTENT_W_MM)); // ≈ 1371

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
  defaultViewport: { width: W, height: 1200, deviceScaleFactor: DSF },
});

// 페이지 안에서 실행: 잘라도 되는 안전한 y(콘텐츠 없는 여백 밴드) 목록과
// 전체 높이를 계산해 돌려준다.
function measureInPage() {
  const root = document.querySelector("#root");

  // 리프(더 쪼갤 수 없는 콘텐츠) 요소들의 세로 구간을 모은다. 큰 컨테이너는
  // 자식이 있으므로 제외되고, 텍스트/이미지/표셀/다이어그램 박스 같은 말단만
  // 남는다 → 이 구간들 '사이'가 안전한 절단 지점이다.
  const spans = [];
  const walk = (el) => {
    // <figure>(이미지+캡션)는 통짜 원자로 취급 — 내부를 쪼개지 않아 이미지와
    // 캡션이 페이지 경계에서 갈라지지 않는다.
    if (el.tagName === "FIGURE") {
      const r = el.getBoundingClientRect();
      if (r.height > 0.5 && r.width > 0.5) spans.push([r.top, r.bottom]);
      return;
    }
    const kids = [...el.children];
    const tall = kids.filter((k) => k.getBoundingClientRect().height > 0.5);
    if (tall.length === 0) {
      const r = el.getBoundingClientRect();
      if (r.height > 0.5 && r.width > 0.5) spans.push([r.top, r.bottom]);
      return;
    }
    for (const k of tall) walk(k);
  };
  walk(root);

  spans.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [t, b] of spans) {
    const last = merged[merged.length - 1];
    if (last && t <= last[1] + 1) last[1] = Math.max(last[1], b);
    else merged.push([t, b]);
  }
  // 병합된 구간 사이의 빈 밴드 = 안전 절단 후보(중앙값)
  const safe = [];
  for (let i = 0; i < merged.length - 1; i++) {
    safe.push((merged[i][1] + merged[i + 1][0]) / 2);
  }
  // 이 섹션들은 반드시 새 페이지에서 시작한다(.export-break-before 마커).
  const forced = [...document.querySelectorAll(".export-break-before")].map(
    (el) => el.getBoundingClientRect().top,
  );
  const total = root.getBoundingClientRect().height;
  return { safe, forced, total };
}

// 강제 구분점(forced)으로 문서를 구간으로 나누고, 각 구간을 안전 밴드로
// 채워 페이지를 만든다. 각 forced 섹션은 항상 페이지 맨 위에서 시작한다.
function paginate(safe, total, pageColH, forced) {
  const bounds = [
    0,
    ...[...new Set(forced.filter((y) => y > 1 && y < total - 1))].sort(
      (a, b) => a - b,
    ),
    total,
  ];
  const slices = [];
  for (let b = 0; b < bounds.length - 1; b++) {
    let cur = bounds[b];
    const segEnd = bounds[b + 1];
    let guard = 0;
    while (segEnd - cur > pageColH + 1 && guard++ < 500) {
      const target = cur + pageColH;
      const after = safe.filter((y) => y > cur + 60 && y < segEnd);
      // 페이지 목표에 가장 가까운 안전 지점을 고른다. 한 블록이 목표를 아주
      // 살짝(≤6%) 넘길 뿐이면 그 블록까지 담고 슬라이스를 지면에 맞춰 축소
      // 배치한다(블록이 간발로 안 들어가 다음 장이 텅 비는 것을 막음).
      const band = after.filter(
        (y) => y >= cur + pageColH * 0.5 && y <= cur + pageColH * 1.06,
      );
      let next;
      if (band.length) {
        next = band.reduce((a, b) =>
          Math.abs(b - target) < Math.abs(a - target) ? b : a,
        );
      } else {
        const le = after.filter((y) => y <= target);
        if (le.length) next = Math.max(...le);
        else if (after.length) next = Math.min(...after); // 페이지보다 큰 블록 → 축소
        else break;
      }
      if (next <= cur) break;
      slices.push([cur, next]);
      cur = next;
    }
    slices.push([cur, segEnd]);
  }
  return slices.filter(([a, c]) => c - a > 1);
}

const pdf = await PDFDocument.create();
const PAGE_W_PT = PAGE_W_MM * PT_PER_MM;
const PAGE_H_PT = PAGE_H_MM * PT_PER_MM;
const MARGIN_PT = MARGIN_MM * PT_PER_MM;
const CONTENT_W_PT = CONTENT_W_MM * PT_PER_MM;
const CONTENT_H_PT = CONTENT_H_MM * PT_PER_MM;

for (const [i, route] of routes.entries()) {
  const page = await browser.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await new Promise((r) => setTimeout(r, 1200));

  const { safe, forced, total } = await page.evaluate(measureInPage);
  const slices = paginate(safe, total, PAGE_COL_H, forced);

  for (const [start, end] of slices) {
    const h = end - start;
    const buf = await page.screenshot({
      clip: { x: 0, y: start, width: W, height: h },
      captureBeyondViewport: true,
    });
    const png = await pdf.embedPng(buf);
    const a4 = pdf.addPage([PAGE_W_PT, PAGE_H_PT]);

    // 콘텐츠 폭(182mm)에 맞춰 스케일. 슬라이스가 한 장보다 높으면(거대 블록)
    // 지면 높이에 맞춰 더 줄이고 가로 가운데 정렬 → 잘림 없이 통째로.
    let drawW = CONTENT_W_PT;
    let drawH = (h / W) * CONTENT_W_PT;
    if (drawH > CONTENT_H_PT) {
      const k = CONTENT_H_PT / drawH;
      drawW *= k;
      drawH = CONTENT_H_PT;
    }
    const x = MARGIN_PT + (CONTENT_W_PT - drawW) / 2;
    const y = PAGE_H_PT - MARGIN_PT - drawH; // 상단 정렬
    a4.drawImage(png, { x, y, width: drawW, height: drawH });
  }

  console.log(`[${i + 1}/3] ${route} — ${slices.length} pages (총 ${Math.round(total)}px)`);
  await page.close();
}

await browser.close();

const bytes = await pdf.save();
try {
  await writeFile(FINAL, bytes);
} catch (e) {
  if (e.code === "EBUSY" || e.code === "EPERM") {
    const alt = FINAL.replace(/\.pdf$/, `-${Date.now().toString().slice(-4)}.pdf`);
    await writeFile(alt, bytes);
    console.log("SAVED(대체):", alt, `(${pdf.getPageCount()} pages)`);
    process.exit(0);
  }
  throw e;
}
console.log("SAVED:", FINAL, `(${pdf.getPageCount()} pages)`);
