import GlobalNav from "../components/GlobalNav";
import Tile from "../components/Tile";
import StatBand from "../components/patterns/StatBand";
import StepFlow from "../components/patterns/StepFlow";
import "./SubProjects.css";

function ProjectMeta({
  items,
  dark = false,
}: {
  items: { k: string; v: string }[];
  dark?: boolean;
}) {
  return (
    <div className={`project-meta${dark ? " project-meta--dark" : ""}`}>
      {items.map((item) => (
        <div className="project-meta__item" key={item.k}>
          <span className="project-meta__k text-caption">{item.k}</span>
          <span className="project-meta__v text-caption-strong">{item.v}</span>
        </div>
      ))}
    </div>
  );
}

function AsIsList({
  rows,
  dark = false,
}: {
  rows: { k: string; v: string }[];
  dark?: boolean;
}) {
  return (
    <div className={`as-is-list${dark ? " as-is-list--dark" : ""}`}>
      {rows.map((r) => (
        <div className="as-is-list__row" key={r.k}>
          <span className="as-is-list__k text-caption-strong">{r.k}</span>
          <span className="as-is-list__v text-caption">{r.v}</span>
        </div>
      ))}
    </div>
  );
}

export default function SubProjects() {
  return (
    <div>
      <GlobalNav />

      <Tile variant="light">
        <p className="tile__eyebrow text-caption-strong">SUB PROJECTS</p>
        <h1 className="text-section-heading">서브 프로젝트 3건</h1>
        <p className="text-body" style={{ color: "var(--color-ink-muted-80)", maxWidth: 640 }}>
          방치된 데이터 정합성 문제를 AI 활용 웹앱으로 자동화하고, 기술 제약을 채널 조합으로
          우회하고, 반복되는 VoC를 제품 구조로 해소한 세 프로젝트입니다.
        </p>
      </Tile>

      {/* PROJECT 02 — 표준바코드 매칭 자동화 */}
      <Tile
        variant="dark"
        eyebrow="PROJECT 02"
        title="표준바코드 매칭 자동화 툴 — 방치된 데이터 정합성 병목을 AI 활용 웹앱으로 자동화"
        subcopy="오프라인 영업 확대로 표준바코드(코리아넷) 관리가 필요해졌지만, 온라인 중심 사업 구조상 사내 시스템에는 임시 바코드만 등록되어 있었습니다. 수기 처리가 불가능한 수준임을 확인하고 자동화 툴 제작을 결정했습니다."
        footer="AI로 만든 건 툴이지만 실제로 설계한 건 변칙 데이터를 식별하는 매칭 기준과 운영자의 다음 액션이었습니다."
      >
        <ProjectMeta
          dark
          items={[
            { k: "프로젝트 기간", v: "1주" },
            { k: "담당 역할", v: "문제 정의 · 매칭 로직 설계 · AI 활용 개발" },
            { k: "팀 구성", v: "단독 수행" },
            { k: "기여도", v: "100%" },
          ]}
        />
        <AsIsList
          dark
          rows={[
            {
              k: "수기 프로세스",
              v: "코리아넷 엑셀 다운 → 사내 상품목록 다운 → 상품코드 수기 매핑 → 바코드 추출 → 재업로드",
            },
            { k: "매칭 불가", v: "두 시스템 간 상품명·코드 표기 상이(오타, 숫자 누락)로 VLOOKUP 불가" },
            { k: "백로그", v: "5,000 SKU 대조 3시간+ → 작업 포기 → 4개월간 약 1,000건 방치" },
            { k: "리소스 제약", v: "IT팀은 플랫폼 개발에 집중, 외부 의존 없는 도구 필요" },
          ]}
        />
        <StepFlow
          dark
          steps={["엑셀 2개 업로드", "자동 매칭 (1분)", "검수 (5분)", "사내 시스템 등록 (5분)"]}
        />
        <StatBand
          dark
          stats={[
            { value: "3시간+ → 10분", label: "매칭 소요 시간 (월 100여 건 정기 처리)" },
            { value: "1,000건", label: "4개월 방치 백로그 일괄 해소" },
            { value: "5,500건", label: "12종 패턴 엔진 누적 검증" },
          ]}
        />
      </Tile>

      {/* PROJECT 03 — 라이브커머스 */}
      <Tile
        variant="light"
        eyebrow="PROJECT 03"
        title="인천e몰 라이브커머스 시범 운영 — 송출 불가 제약을 채널 분리로 우회한 신규 세일즈 채널 검증"
        subcopy="226만 이용자 규모 지역몰의 이커머스 활성화와 매출 확대를 위해 라이브커머스 시범 운영이 필요했습니다. 목표는 대규모 개발 없이 실제 구매까지 이어지는 라이브 세일즈 채널이 성립하는지 검증하는 것이었습니다."
        footer="제약을 개발로 뚫는 대신 채널 조합으로 세일즈 가설을 빠르게 검증했습니다."
      >
        <ProjectMeta
          items={[
            { k: "프로젝트 기간", v: "확인 필요" },
            { k: "담당 역할", v: "라이브커머스 운영 기획 · 채널 플로우 설계 · 편성 전략" },
            { k: "팀 구성", v: "MD·전략기획·디자인·개발 협업 (인원 확인 필요)" },
            { k: "기여도", v: "확인 필요" },
          ]}
        />
        <AsIsList
          rows={[
            { k: "기술 제약", v: "앱인앱 구조로 앱 내 자체 라이브 송출 불가" },
            {
              k: "비즈니스 제약",
              v: "지역화폐 결제·프로모션 성과 측정·매출 집계 때문에 최종 결제는 반드시 자사몰 내부 필요",
            },
            { k: "리소스 제약", v: "스트리밍 인프라 구축은 시범 운영 대비 과투자" },
          ]}
        />
        <StepFlow
          steps={["유튜브 라이브 (시청·채팅)", "채팅창 고정 링크", "자사몰 상품 상세", "앱 내부 결제"]}
        />
        <StatBand
          stats={[
            { value: "개발 0건", label: "별도 라이브 기능 개발 없이 진행" },
            { value: "약 3,000만원", label: "시범 운영 매출" },
          ]}
        />
      </Tile>

      {/* PROJECT 04 — 복지플랫폼 마이페이지 */}
      <Tile
        variant="parchment"
        eyebrow="PROJECT 04"
        title="복지플랫폼 마이페이지 개편 — 반복 VoC를 핵심 재화 접근성 문제로 재정의해 IA/UXUI 전면 개편"
        subcopy="계약 기업 임직원이 지급받은 복지포인트로 상품을 구매하는 B2B 복지몰 플랫폼입니다. 사용자 대다수가 모바일 앱을 이용했지만 핵심 재화인 복지포인트 현황은 모바일 웹에서만 노출되는 구조였습니다."
        footer="적은 모수의 VoC라도 핵심 페인포인트가 담겨 있다 — 반복 문의를 제품 구조 안에서 해소했습니다."
      >
        <ProjectMeta
          items={[
            { k: "프로젝트 기간", v: "2022.01 ~ 2022.02 (2개월)" },
            { k: "담당 역할", v: "UX 개선점 도출 · 타사 레퍼런스 조사 · UXUI 기획" },
            { k: "팀 구성", v: "전략기획팀 1명 · 디자인팀 1명 · 개발팀 1명" },
            { k: "기여도", v: "기획 100%" },
          ]}
        />
        <AsIsList
          rows={[
            { k: "Why?", v: "포인트가 모바일 웹에서만 노출 → 앱 위주 사용자는 확인 불가" },
            {
              k: "What?",
              v: "① 언제/왜 지급·회수되었는지 ② 언제/왜 사용했는지 — 잔액만이 아니라 히스토리 수요 확인",
            },
            {
              k: "레퍼런스 12개",
              v: "메인 1Depth 포인트 현황 요약 · 상세 페이지 히스토리 제공 · 메뉴 통폐합",
            },
          ]}
        />
        <StatBand
          stats={[{ value: "VoC 100% 감소", label: "정식 런칭 후 복지포인트 관련 문의 (주 1~3회 → 0건)" }]}
        />
      </Tile>
    </div>
  );
}
