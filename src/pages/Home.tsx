import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "../components/GlobalNav";
import Tile from "../components/Tile";
import { ToolIcon } from "../components/ToolIcon";
import structureEmoji from "../assets/competency-emoji/structure.png";
import alignEmoji from "../assets/competency-emoji/align.png";
import aiEmoji from "../assets/competency-emoji/ai.png";
import meMemoji from "../assets/me-memoji.png";
import { DEFAULT_ORDER, type SectionId, type Variant } from "../variants";
import { useIsExport } from "../export-mode";
import "./Home.css";

// Hero / Projects 섹션의 기본 문구. variant가 있으면 해당 항목만 덮어씁니다.
// 기본 Hero는 헤드라인만 노출하는 슬림 구조입니다. 소개 문단(prose)은 바로
// 아래 About 섹션이 전담합니다. variant가 hero.body를 넣으면 그때만 문단이
// 나타납니다(예: focus-media).
const HERO_DEFAULT = {
  eyebrow: "프로덕트 기획자",
  lead: "복잡한 운영 구조를 기획으로 풀어내는",
  accent: "PM 박건주",
  tail: "입니다.",
  body: undefined as string | undefined,
  image: meMemoji as string | undefined,
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
  "특히, 결제·정산처럼 어긋나면 회계·법무 문제로 번지는 영역에서 사용자 화면과 관리자(백오피스)를 함께 다루며 정책·데이터·정산 흐름이 서로 어긋나지 않도록 기준을 잡았습니다. 문제를 정의할 때는 거래처 설문조사 등을 통한 정성적 VOC와 실제 주문·물량 데이터를 함께 근거로 활용합니다.",
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
    body: "표면적인 요구사항 이면의 근본 원인을 파악하고, 복잡한 비즈니스 로직을 명확한 정책과 흐름으로 분해하여 불확실성을 해소합니다.",
    emoji: structureEmoji,
  },
  {
    title: "이해관계자와 조율합니다",
    body: "상충하는 요구사항 속에서 객관적인 기준으로 우선순위를 정하고, 의사결정 근거를 투명하게 문서화하여 합의를 이끌어냅니다.",
    emoji: alignEmoji,
  },
  {
    title: "직접 만들어 빠르게 실행합니다",
    body: "리소스 제약을 핑계 삼지 않고, AI 등을 활용해 업무 병목을 해결하는 도구를 직접 구축하여 빠르게 가설을 검증합니다.",
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

// About 문단 안의 `**강조 문장**` 표기를 볼드(<strong>)로 렌더. 변형 파일(.ts)에서
// JSX를 못 쓰므로, 문자열에 마커만 넣으면 여기서 강조 조각으로 변환한다.
function renderEmphasis(text: string) {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: "var(--color-ink)", fontWeight: 600 }}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function Home({ variant }: { variant?: Variant }) {
  // 기본 문구에 variant override를 병합
  const hero = { ...HERO_DEFAULT, ...variant?.hero };
  const projects = {
    b2b: { ...PROJECTS_DEFAULT.b2b, ...variant?.projects?.b2b },
    sub: { ...PROJECTS_DEFAULT.sub, ...variant?.projects?.sub },
  };
  const aboutParas = variant?.about?.paragraphs ?? ABOUT_DEFAULT;
  // 경력 목록: variant가 experience를 주면 통째로 대체, 없으면 기본 목록
  const experiences = variant?.experience ?? EXPERIENCES;
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
        <div className={hero.image ? "hero-lockup hero-lockup--with-image" : "hero-lockup"}>
          {hero.image && (
            <img className="hero-lockup__image" src={hero.image} alt="" aria-hidden="true" />
          )}
          <div className="hero-lockup__text">
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
          </div>
        </div>
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
            {aboutParas.map((para, i) =>
              // "## " 접두사가 붙은 항목은 About 중간 소제목(예: WHY TOSS PAYMENTS?)으로 렌더
              para.startsWith("## ") ? (
                <p key={i} className="about-subhead text-caption-strong">
                  {para.slice(3)}
                </p>
              ) : (
                <p
                  key={i}
                  className="text-body"
                  style={{ color: "var(--color-ink-muted-80)", marginTop: i === 0 ? 0 : 14 }}
                >
                  {renderEmphasis(para)}
                </p>
              ),
            )}
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
          {experiences.map((e) => (
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
                2023.04 — 2023.07
              </span>
            </div>
            <div className="exp-content">
              <p className="text-body-strong">코드스테이츠</p>
              <p className="text-caption" style={{ color: "var(--color-ink-muted-80)" }}>
                Product Management 부트캠프 수료
              </p>
              <ul className="exp-bullets text-caption">
                <li>
                  PM/PO 직무 전환을 목표로 UX 리서치, 요구사항 정의, BM·경쟁사 분석 등 서비스 기획 전반을 학습
                </li>
                <li>
                  팀 프로젝트로 PRD·와이어프레임 등 기획 산출물을 작성하고 Notion·Figma 협업 프로세스를 실습
                </li>
              </ul>
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
