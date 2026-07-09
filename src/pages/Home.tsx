import { Link } from "react-router-dom";
import GlobalNav from "../components/GlobalNav";
import Tile from "../components/Tile";
import { ToolIcon } from "../components/ToolIcon";
import redefineEmoji from "../assets/competency-emoji/redefine.png";
import structureEmoji from "../assets/competency-emoji/structure.png";
import alignEmoji from "../assets/competency-emoji/align.png";
import aiEmoji from "../assets/competency-emoji/ai.png";
import "./Home.css";

const EXPERIENCES = [
  {
    company: "주식회사 다운포스",
    period: "2024.08 — 현재",
    duration: "약 2년",
    role: "기획 팀원",
    note: "B2B 입점형 도매 플랫폼 기획 전담 · 기여도 90%",
  },
  {
    company: "주식회사 앵커스",
    period: "2023.07 — 2024.08",
    duration: "1년 2개월",
    role: "기획 팀원",
    note: "글로벌 대기업 CRM 시스템 QA — 11개 고객 터치포인트 데이터 연동 검증",
  },
  {
    company: "주식회사 인디앤드코리아",
    period: "2021.04 — 2022.11",
    duration: "1년 8개월",
    role: "전략기획 팀원",
    note: "인천e몰 라이브커머스 시범 운영 · 복지플랫폼 마이페이지 개편",
  },
  {
    company: "(주)공팔리터",
    period: "2020.05 — 2020.11",
    duration: "7개월",
    role: "마케팅·영업 팀원",
    note: "",
  },
];

const COMPETENCIES = [
  {
    title: "1. 문제를 재정의합니다",
    body: "요구사항을 곧바로 기획서나 할 일 목록으로 옮기지 않습니다. 먼저 '왜 이 문제가 생겼는지' 그 뒤에 어떤 구조와 운영 리스크가 숨어 있는지 봅니다. 단순한 개선 요청도 거래 구조·책임 주체·운영 기준이 바뀐다면 문제 자체를 다시 정의합니다.",
    emoji: redefineEmoji,
  },
  {
    title: "2. 생각을 구조화합니다",
    body: "복잡한 문제를 잘게 쪼개서 생각합니다. 누가 무엇을 처리하는지, 어떤 흐름에서 예외가 생기는지, 무엇을 기준으로 판단해야 하는지 구조화합니다. 이를 기반으로 팀이 같은 그림을 보고 논의할 수 있는 구조로 명확히 정리합니다.",
    emoji: structureEmoji,
  },
  {
    title: "3. 이해관계자와 조율합니다",
    body: "요구가 서로 달라도 풀어갈 수 있는 방법을 찾습니다. 대표·거래처·운영팀·재무팀의 엇갈리는 요구와 제약을 '어떤 기준으로 나누고 결정할지'를 고민합니다. 의사결정 근거와 우려되는 리스크까지 문서로 남겨 나중에 다시 흔들리지 않도록 기준을 세웁니다.",
    emoji: alignEmoji,
  },
  {
    title: "4. AI를 적극 활용합니다",
    body: "필요한 도구가 없다고 기다리지 않습니다. 반복 업무나 데이터 정합성 등 풀 수 있는 문제를 발견하면 AI와 노코드 툴을 활용해 실무에 바로 적용할 수 있는 자동화 흐름을 직접 만듭니다.",
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

export default function Home() {
  return (
    <div>
      <GlobalNav />

      {/* ─── Hero ─── */}
      <Tile variant="light" className="tile--compact-bottom">
        <p className="tile__eyebrow text-caption-strong">프로덕트 기획자 PORTFOLIO</p>
        <h1 className="hero-headline" style={{ maxWidth: 640 }}>
          <span className="hero-headline__lead">복잡한 운영 구조를 기획으로 풀어내는</span>
          <br />
          <span className="hero-accent">PM 박건주</span>입니다.
        </h1>
        <p className="text-body" style={{ color: "var(--color-ink-muted-80)", maxWidth: 640, marginTop: 24 }}>
          단순 기능을 기획하는 것을 넘어 비즈니스 모델에 따른 회원·상품·주문·결제·정산 전 사이클의
          운영 기준을 처음부터 잡았습니다. 문제의 본질과 그 안에 숨은 리스크를 먼저 보고
          실제 사용자가 업무를 끝까지 처리할 수 있는 수준까지 설계합니다.
        </p>
      </Tile>

      {/* ─── Project Buttons ─── */}
      <Tile variant="light" eyebrow="PROJECTS" className="tile--compact-top">
        <div className="hero-project-buttons">
          <Link className="hero-project-btn" to="/b2b-platform">
            <span className="hero-project-btn__text">
              <span className="text-body-strong">B2B몰 1P → 3P 플랫폼 전환</span>
              <span className="text-caption hero-project-btn__desc">
                회원·상품·주문·결제·정산 전 사이클 재설계
              </span>
            </span>
            <span className="hero-project-btn__arrow">→</span>
          </Link>
          <Link className="hero-project-btn" to="/sub-projects">
            <span className="hero-project-btn__text">
              <span className="text-body-strong">서브 프로젝트 3건</span>
              <span className="text-caption hero-project-btn__desc">
                바코드 매칭 자동화 · 라이브커머스 기획 · 마이페이지 개편
              </span>
            </span>
            <span className="hero-project-btn__arrow">→</span>
          </Link>
        </div>
      </Tile>

      {/* ─── About ─── */}
      <Tile variant="dark" eyebrow="ABOUT">
        <div className="about-grid">
          <div className="about-grid__desc">
            <p className="text-body" style={{ color: "var(--color-body-muted)" }}>
              B2B 커머스 플랫폼에서 PM으로 일하며 회원·상품·주문·결제·정산까지 운영 기준을
              0 to 1로 설계했습니다. 거래처·공급사·운영자가 실제 업무를 끝까지 처리할 수
              있는 수준까지 만드는 것을 목표로 합니다.
            </p>
            <p className="text-body" style={{ color: "var(--color-body-muted)", marginTop: 14 }}>
              특히, 결제·정산처럼 어긋나면 회계·법무 문제로 번지는 영역에서 사용자 화면과
              관리자(백오피스)를 함께 설계하고 정책·데이터·정산 흐름이 서로 어긋나지 않도록
              기준을 잡았습니다. 문제를 정의할 때는 거래처 설문조사 등을 통한 정성적 VOC와
              실제 주문·물량 데이터를 함께 근거로 활용합니다.
            </p>
            <p className="text-body" style={{ color: "var(--color-body-muted)", marginTop: 14 }}>
              필요할 때는 있는 자원으로 빠르게 실행하기도 합니다. 개발 리소스를 최소화하여
              라이브커머스를 시범 운영해보고, 반복 업무는 AI로 자동화 툴을 직접 만들어
              해결합니다.
            </p>
          </div>
        </div>
      </Tile>

      {/* ─── How I Work ─── */}
      <Tile variant="parchment" eyebrow="HOW I WORK" title="일하는 방식">
        <div className="competency-grid">
          {COMPETENCIES.map((c) => (
            <div className="competency-card" key={c.title}>
              <img className="competency-card__emoji" src={c.emoji} alt="" aria-hidden="true" />
              <p className="text-body-strong" style={{ color: "var(--color-primary)" }}>
                {c.title}
              </p>
              <p
                className="text-caption"
                style={{ color: "var(--color-ink-muted-80)", marginTop: 10, textAlign: "justify" }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </Tile>

      {/* ─── Experience ─── */}
      <Tile variant="light" eyebrow="EXPERIENCE" title="이력">
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
                {e.note && (
                  <p
                    className="text-caption"
                    style={{ color: "var(--color-ink-muted-48)", marginTop: 4 }}
                  >
                    {e.note}
                  </p>
                )}
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

      {/* ─── Tools ─── */}
      <Tile variant="dark" eyebrow="TOOLS" title="툴">
        <div className="tools-section">
          <div className="tools-group">
            <p className="text-caption-strong tools-group__label">주요</p>
            <div className="tools-grid">
              {TOOLS_PRIMARY.map((t) => (
                <div className="tool-chip" key={t.id}>
                  <ToolIcon id={t.id} />
                  <div className="tool-chip__text">
                    <span className="text-caption-strong" style={{ color: "#fff" }}>
                      {t.label}
                    </span>
                    <span className="text-fine-print" style={{ color: "var(--color-body-muted)" }}>
                      {t.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="tools-group">
            <p className="text-caption-strong tools-group__label">보조</p>
            <div className="tools-grid">
              {TOOLS_SECONDARY.map((t) => (
                <div className="tool-chip tool-chip--secondary" key={t.id}>
                  <ToolIcon id={t.id} />
                  <div className="tool-chip__text">
                    <span
                      className="text-caption-strong"
                      style={{ color: "var(--color-body-muted)" }}
                    >
                      {t.label}
                    </span>
                    <span className="text-fine-print" style={{ color: "var(--color-ink-muted-48)" }}>
                      {t.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Tile>
    </div>
  );
}
