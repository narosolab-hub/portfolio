import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "../components/GlobalNav";
import Tile from "../components/Tile";
import { ToolIcon } from "../components/ToolIcon";
import structureEmoji from "../assets/competency-emoji/structure.png";
import alignEmoji from "../assets/competency-emoji/align.png";
import aiEmoji from "../assets/competency-emoji/ai.png";
import { DEFAULT_ORDER, type SectionId, type Variant } from "../variants";
import { useIsExport } from "../export-mode";
import "./Home.css";

// Hero / Projects 섹션의 기본 문구. variant가 있으면 해당 항목만 덮어씁니다.
// 기본 Hero는 헤드라인만 노출하는 슬림 구조입니다. 소개 문단(prose)은 바로
// 아래 About 섹션이 전담합니다. variant가 hero.body를 넣으면 그때만 문단이
// 나타납니다(예: focus-media).
const HERO_DEFAULT = {
  eyebrow: "프로덕트 기획자 PORTFOLIO",
  lead: "복잡한 운영 구조를 기획으로 풀어내는",
  accent: "PM 박건주",
  tail: "입니다.",
  body: undefined as string | undefined,
};

const PROJECTS_DEFAULT = {
  b2b: {
    title: "B2B몰 1P → 3P 플랫폼 전환",
    desc: "회원·상품·주문·결제·정산 전 사이클 재설계",
  },
  sub: {
    title: "서브 프로젝트 3건",
    desc: "바코드 매칭 자동화 · 라이브커머스 기획 · 마이페이지 개편",
  },
};

// About 섹션 기본 문단. variant.about.paragraphs가 있으면 통째로 대체됩니다.
const ABOUT_DEFAULT: string[] = [
  "B2B 커머스 플랫폼에서 PM으로 일하며 회원·상품·주문·결제·정산까지 운영 기준을 0 to 1로 설계했습니다. 거래처·공급사·운영자가 실제 업무를 끝까지 처리할 수 있는 수준까지 만드는 것을 목표로 합니다.",
  "특히, 결제·정산처럼 어긋나면 회계·법무 문제로 번지는 영역에서 사용자 화면과 관리자(백오피스)를 함께 설계하고 정책·데이터·정산 흐름이 서로 어긋나지 않도록 기준을 잡았습니다. 문제를 정의할 때는 거래처 설문조사 등을 통한 정성적 VOC와 실제 주문·물량 데이터를 함께 근거로 활용합니다.",
  "필요할 때는 있는 자원으로 빠르게 실행하기도 합니다. 개발 리소스를 최소화하여 라이브커머스를 시범 운영해보고, 반복 업무는 AI로 자동화 툴을 직접 만들어 해결합니다.",
];

const EXPERIENCES = [
  {
    company: "주식회사 다운포스",
    period: "2024.08 — 현재",
    duration: "1년 11개월",
    role: "플랫폼기획팀 · 대리(팀장대행) · Product Manager",
    bullets: [
      "연 24억·거래처 340개 규모 B2B몰을 1P·3P 혼합 입점형 플랫폼으로 전환하는 프로젝트를 1인 PM으로 리드",
    ],
  },
  {
    company: "주식회사 앵커스",
    period: "2023.07 — 2024.08",
    duration: "1년 2개월",
    role: "기획팀 · 사원 · QA 담당",
    bullets: [
      "글로벌 럭셔리 브랜드 CRM 통합 프로젝트 QA — 5개 리전·3개 사업부·3개 채널 데이터 통합 검증",
    ],
  },
  {
    company: "주식회사 인디앤드코리아",
    period: "2021.04 — 2022.11",
    duration: "1년 8개월",
    role: "전략기획팀 · 주임",
    bullets: [
      "라이브커머스 4회로 약 3,900만 원 매출, 마이페이지 IA·UX 개편으로 관련 문의 0건 달성",
    ],
  },
  {
    company: "주식회사 공팔리터",
    period: "2020.05 — 2020.11",
    duration: "7개월",
    role: "마케팅·영업팀 · 사원(계약직)",
    bullets: [
      "리뷰 마케팅 플랫폼 신규 광고주 발굴·캠페인 운영으로 개인 매출 3,000만 원 달성",
    ],
  },
];

const COMPETENCIES = [
  {
    title: "문제를 구조로 다시 정의합니다",
    body: "요구사항을 그대로 옮기지 않습니다. 왜 이 문제가 생겼는지와 그 뒤에 숨은 구조·리스크를 먼저 보고, 흐름·예외·판단 기준으로 쪼개 팀이 같은 그림으로 논의할 수 있게 정리합니다.",
    emoji: structureEmoji,
  },
  {
    title: "이해관계자와 조율합니다",
    body: "경영진·거래처·운영·재무의 엇갈리는 요구를 어떤 기준으로 나누고 결정할지 고민합니다. 의사결정 근거와 리스크를 문서로 남겨 기준이 나중에 흔들리지 않게 합니다.",
    emoji: alignEmoji,
  },
  {
    title: "AI를 적극 활용합니다",
    body: "도구가 없다고 기다리지 않습니다. 반복 업무나 데이터 정합성 문제를 발견하면 AI·노코드 툴로 실무에 바로 쓰는 자동화를 직접 만듭니다.",
    emoji: aiEmoji,
  },
];

const TOOLS_PRIMARY = [
  { id: "notion",       label: "Notion",        desc: "요구사항 정의 · 스펙 문서화" },
  { id: "claude",       label: "Claude",         desc: "기획 가속화 · 툴 개발" },
  { id: "googlesheets", label: "Google Sheets",  desc: "프로젝트 관리 · QA 이슈 관리" },
  { id: "slack",        label: "Slack",          desc: "외주 커뮤니케이션" },
];

const TOOLS_SECONDARY = [
  { id: "powerpoint", label: "PowerPoint", desc: "보고서 · 발표 자료" },
  { id: "figma",      label: "Figma",      desc: "화면 설계·검토 · 레퍼런스 분석" },
];

export default function Home({ variant }: { variant?: Variant }) {
  // 기본 문구에 variant override를 병합
  const hero = { ...HERO_DEFAULT, ...variant?.hero };
  const projects = {
    b2b: { ...PROJECTS_DEFAULT.b2b, ...variant?.projects?.b2b },
    sub: { ...PROJECTS_DEFAULT.sub, ...variant?.projects?.sub },
  };
  const aboutParas = variant?.about?.paragraphs ?? ABOUT_DEFAULT;
  // How I Work 카드: 기본 3장에 variant가 지정한 인덱스별 title/body만 덮어씀
  const competencies = COMPETENCIES.map((c, i) => ({
    ...c,
    ...variant?.how?.competencies?.[i],
  }));

  // 섹션 순서/숨김을 먼저 계산. Hero와 Projects가 실제로 맞붙어 있을 때만
  // 둘 사이 여백을 좁히고(compact), About 등이 끼면 기본 여백을 그대로 둡니다.
  // 제출용 PDF(export=1)에서는 다른 페이지로 넘어가는 프로젝트 이동 버튼이
  // 의미가 없으므로 projects 섹션을 통째로 뺀다(빈 여백·페이지 낭비 방지).
  const exportMode = useIsExport();
  const order = variant?.order ?? DEFAULT_ORDER;
  const hidden = new Set(variant?.hidden ?? []);
  if (exportMode) hidden.add("projects");
  const visible = order.filter((id) => !hidden.has(id));
  const heroIdx = visible.indexOf("hero");
  const heroProjAdjacent =
    heroIdx !== -1 && visible[heroIdx + 1] === "projects";

  // 각 섹션을 id로 조회할 수 있게 렌더 함수로 분리
  const sections: Record<SectionId, () => ReactNode> = {
    // ─── Hero ───
    hero: () => (
      <Tile
        variant="light"
        className={heroProjAdjacent ? "tile--compact-bottom" : undefined}
      >
        <p className="tile__eyebrow text-caption-strong">{hero.eyebrow}</p>
        <h1 className="hero-headline" style={{ maxWidth: 640 }}>
          <span className="hero-headline__lead">{hero.lead}</span>
          <br />
          <span className="hero-accent">{hero.accent}</span>
          {hero.tail}
        </h1>
        {hero.body && (
          <p className="text-body" style={{ color: "var(--color-ink-muted-80)", maxWidth: 640, marginTop: 24 }}>
            {hero.body}
          </p>
        )}
      </Tile>
    ),

    // ─── Project Buttons ───
    projects: () => (
      <Tile
        variant="light"
        eyebrow="PROJECTS"
        className={heroProjAdjacent ? "tile--compact-top" : undefined}
      >
        <div className="hero-project-buttons">
          <Link className="hero-project-btn" to="/b2b-platform">
            <span className="hero-project-btn__text">
              <span className="text-body-strong">{projects.b2b.title}</span>
              <span className="text-caption hero-project-btn__desc">
                {projects.b2b.desc}
              </span>
            </span>
            <span className="hero-project-btn__arrow">→</span>
          </Link>
          <Link className="hero-project-btn" to="/sub-projects">
            <span className="hero-project-btn__text">
              <span className="text-body-strong">{projects.sub.title}</span>
              <span className="text-caption hero-project-btn__desc">
                {projects.sub.desc}
              </span>
            </span>
            <span className="hero-project-btn__arrow">→</span>
          </Link>
        </div>
      </Tile>
    ),

    // ─── About ───
    about: () => (
      <Tile variant="parchment" eyebrow="ABOUT">
        <div className="about-grid">
          <div className="about-grid__desc">
            {aboutParas.map((para, i) => (
              <p
                key={i}
                className="text-body"
                style={{ color: "var(--color-ink-muted-80)", marginTop: i === 0 ? 0 : 14 }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </Tile>
    ),

    // ─── How I Work ───
    how: () => (
      <Tile variant="parchment" eyebrow="HOW I WORK">
        <div className="competency-grid">
          {competencies.map((c) => (
            <div className="competency-card" key={c.title}>
              <img className="competency-card__emoji" src={c.emoji} alt="" aria-hidden="true" />
              <p className="text-body-strong" style={{ color: "var(--color-primary)" }}>
                {c.title}
              </p>
              <p
                className="text-caption"
                style={{ color: "var(--color-ink-muted-80)", marginTop: 12, lineHeight: 1.65 }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </Tile>
    ),

    // ─── Experience ───
    experience: () => (
      <Tile variant="light" className="export-break-before" eyebrow="EXPERIENCE">
        <div className="exp-list">
          {EXPERIENCES.map((e) => (
            <div className="exp-row" key={e.company}>
              <div className="exp-meta">
                <span className="text-caption" style={{ color: "var(--color-ink-muted-48)" }}>
                  {e.period}
                </span>
                <span
                  className="text-caption"
                  style={{ color: "var(--color-ink-muted-48)", marginTop: 2 }}
                >
                  {e.duration}
                </span>
              </div>
              <div className="exp-content">
                <p className="text-body-strong">{e.company}</p>
                <p className="text-caption" style={{ color: "var(--color-ink-muted-80)" }}>
                  {e.role}
                </p>
                <ul className="exp-bullets text-caption">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="exp-education">
          <p className="text-caption-strong exp-education__label">EDUCATION</p>
          <div className="exp-row">
            <div className="exp-meta">
              <span className="text-caption" style={{ color: "var(--color-ink-muted-48)" }}>
                2014.03 — 2019.02
              </span>
            </div>
            <div className="exp-content">
              <p className="text-body-strong">인하대학교</p>
              <p className="text-caption" style={{ color: "var(--color-ink-muted-80)" }}>
                중국학과 졸업
              </p>
            </div>
          </div>
          <div className="exp-row">
            <div className="exp-meta">
              <span className="text-caption" style={{ color: "var(--color-ink-muted-48)" }}>
                2023.04
              </span>
            </div>
            <div className="exp-content">
              <p className="text-body-strong">코드스테이츠</p>
              <p className="text-caption" style={{ color: "var(--color-ink-muted-80)" }}>
                프로덕트매니지먼트 부트캠프 수강
              </p>
            </div>
          </div>
        </div>
      </Tile>
    ),

    // ─── Tools ───
    // How I Work 다음에 이어지는 "다룰 수 있는 툴" 스킬셋. 주요/보조는 별도
    // 헤더 없이 한 그리드에 합치고, 보조는 흐리게(--secondary) 처리로만 구분해
    // 세로 높이를 최소화한다(인쇄 시 Overview가 툴 때문에 밀리지 않도록).
    tools: () => (
      <Tile variant="parchment" eyebrow="TOOLS">
        <div className="tools-grid">
          {[
            ...TOOLS_PRIMARY.map((t) => ({ ...t, secondary: false })),
            ...TOOLS_SECONDARY.map((t) => ({ ...t, secondary: true })),
          ].map((t) => (
            <div
              className={`tool-chip${t.secondary ? " tool-chip--secondary" : ""}`}
              key={t.id}
            >
              <ToolIcon id={t.id} />
              <div className="tool-chip__text">
                <span className="text-caption-strong tool-chip__label">{t.label}</span>
                <span className="text-fine-print tool-chip__desc">{t.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </Tile>
    ),
  };

  return (
    <div>
      <GlobalNav />
      {visible.map((id) => (
        <Fragment key={id}>{sections[id]()}</Fragment>
      ))}
    </div>
  );
}
