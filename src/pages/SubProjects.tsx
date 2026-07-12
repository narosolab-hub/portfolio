import { useState } from "react";
import GlobalNav from "../components/GlobalNav";
import Tile from "../components/Tile";
import ProjectMeta from "../components/patterns/ProjectMeta";
import StepFlow from "../components/patterns/StepFlow";
import Lightbox from "../components/Lightbox";
import uploadScreen from "../assets/barcode-tool/upload-screen.png";
import resultScreen from "../assets/barcode-tool/result-screen.png";
import flowLogicScreen from "../assets/live-commerce/flow-logic.png";
import mypageFeatureImprovement from "../assets/welfare-mypage/feature-improvement.png";
import wireframeSpec from "../assets/welfare-mypage/wireframe-spec.png";
import "./SubProjects.css";

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

function SectionLabel({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <p className={`sub-project__label text-caption-strong${dark ? " sub-project__label--dark" : ""}`}>
      {children}
    </p>
  );
}

function PhaseLead({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <div className={`phase-lead${dark ? " phase-lead--dark" : ""}`}>
      <p className="phase-lead__text">{children}</p>
    </div>
  );
}

function StatusTable({
  rows,
  dark = false,
}: {
  rows: { status: string; criteria: string; action: string }[];
  dark?: boolean;
}) {
  return (
    <div className={`status-table-wrap${dark ? " status-table-wrap--dark" : ""}`}>
      <table className="status-table">
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "48%" }} />
          <col style={{ width: "32%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>상태</th>
            <th>판정 기준</th>
            <th>다음 액션</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.status}>
              <td className="status-table__label">{r.status}</td>
              <td>{r.criteria}</td>
              <td>{r.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScreenshotGallery({
  images,
}: {
  images: { src: string; caption: string }[];
}) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  return (
    <>
      <div
        className={`screenshot-gallery${images.length === 1 ? " screenshot-gallery--single" : ""}`}
      >
        {images.map((img) => (
          <figure className="screenshot-gallery__item" key={img.caption}>
            <button
              type="button"
              className={`screenshot-gallery__frame${
                images.length === 1 ? " screenshot-gallery__frame--wide" : ""
              }`}
              onClick={() => setLightbox({ src: img.src, alt: img.caption })}
              aria-label={`${img.caption} 크게 보기`}
            >
              <img src={img.src} alt={img.caption} className="screenshot-gallery__image" />
            </button>
            <figcaption className="screenshot-gallery__caption text-caption">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </>
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
          영업팀에서 필요했던 바코드 매칭 업무를 자동화 웹앱으로 만들어 업무 생산성을 높이고, 앱인앱 구조에서 발생했던 라이브 송출 채널 제약은
          유튜브·자사몰 채널 분리로 우회하고, 반복되던 복지포인트 문의는 마이페이지 구조 개편으로 없앴던 프로젝트들을 소개합니다.
        </p>
      </Tile>

      {/* PROJECT 02 — 표준바코드 매칭 자동화 */}
      <Tile
        variant="parchment"
        eyebrow="PROJECT 02"
        title="AI로 표준바코드 매칭 업무 간소화 웹앱 개발"
        subcopy="오프라인 영업 확대로 표준바코드(코리아넷) 관리가 필요해졌지만, 온라인 중심 사업 구조상 사내 시스템에는 임시 바코드만 등록되어 있었습니다. 수기 처리하기엔 번거로운 작업이 많아 간소화 툴을 만들어 2시간 넘게 걸리던 대조 작업을 10분 내외로 줄여 월 100여 건을 정기적으로 처리하고 있습니다."
      >
        <ProjectMeta
          items={[
            { k: "프로젝트 기간", v: "1주" },
            { k: "담당 역할", v: "문제 정의 · 매칭 로직 설계 · 웹앱 개발" },
            { k: "팀 구성", v: "단독 수행" },
            { k: "기여도", v: "100%" },
          ]}
        />
        <PhaseLead>전사 차원에서 중요하지 않지만 영업팀에서는 중요했던 바코드 매칭 업무는 4개월째 백로그로 쌓였습니다.</PhaseLead>
        <AsIsList
          rows={[
            {
              k: "수기 프로세스",
              v: "코리아넷 엑셀 다운 → 사내 시스템 재고현황목록 다운 → 상품코드 기반 수기 매핑 → 바코드 추출 → 재업로드",
            },
            { k: "매칭 불가", v: "두 시스템 간 상품명·코드 표기 상이(오타, 숫자 누락)로 매핑 실패 건 다수 발생" },
            { k: "백로그", v: "5,000 SKU 대조 2시간+ → 작업 포기 → 4개월간 약 1,000건 방치" },
            {
              k: "리소스 제약",
              v: "사내 IT개발팀 역시 다른 프로젝트 진행 중으로 AI(GPT·Claude·Gemini)를 활용해 직접 개발",
            },
          ]}
        />
        <PhaseLead>같은 코드인데도 매칭이 계속 실패해, 실패 원인을 가설로 세우고 실데이터와 대조하며 매칭 로직을 단계적으로 보완했습니다.</PhaseLead>
        <div className="sub-project__section">
          <SectionLabel>설계 판단</SectionLabel>
          <AsIsList
            rows={[
              {
                k: "매칭 키 선정",
                v: "상품명은 띄어쓰기·표현 차이로 같은 상품도 불일치 → 상품명 끝에 반복되는 상품코드를 실제 매칭 키로 확정",
              },
              {
                k: "입력값 정규화",
                v: "오타·공백·특수문자 등 예외를 정규화 규칙으로 흡수해 같은 코드가 어긋나지 않도록 처리",
              },
              {
                k: "유사코드 추천",
                v: "정규화로도 안 잡히는 오타는 유사코드를 자동 추천 (예: S2500960 vs S2500690)",
              },
              {
                k: "패턴 누적",
                v: "실데이터로 패턴을 반복 검증해 매칭률을 높이고, 검증된 패턴은 보존·신규 패턴만 누적하는 방식으로 전환",
              },
            ]}
          />
        </div>
        <StepFlow
          steps={[
            "사내 시스템 재고현황목록 다운",
            "코리아넷 표준바코드 파일 다운",
            "매칭 사이트 업로드·자동 매칭",
            "사내 시스템 표준바코드 등록",
          ]}
        />
        <ScreenshotGallery
          images={[
            { src: uploadScreen, caption: "코리아넷·사내 시스템 재고현황 엑셀을 업로드하는 매칭 시작 화면" },
            {
              src: resultScreen,
              caption: "정상 일치 · 코리아넷 없음 · 바코드 교체 필요 3개 상태로 분류된 실제 매칭 결과 화면",
            },
          ]}
        />
        <div className="sub-project__section">
          <SectionLabel>상태값 3분류</SectionLabel>
          <StatusTable
            rows={[
              {
                status: "정상 일치",
                criteria: "내부 바코드와 코리아넷 바코드가 880으로 일치",
                action: "별도 액션 불필요",
              },
              {
                status: "코리아넷 없음",
                criteria: "코리아넷에 해당 상품 데이터 없음 (상품코드·상품명 오타 또는 코리아넷 미등록)",
                action: "코리아넷 직접 확인",
              },
              {
                status: "바코드 교체 필요",
                criteria: "표준바코드(880) 미등록 또는 코리아넷과 불일치",
                action: "코리아넷 바코드로 교체",
              },
            ]}
          />
        </div>
      </Tile>

      {/* PROJECT 03 — 라이브커머스 */}
      <Tile
        variant="light"
        eyebrow="PROJECT 03"
        title="인천e몰 라이브커머스 시범 운영
송출 불가 제약을 채널 분리로 우회한 신규 세일즈 채널 검증"
        subcopy="226만이 이용하는 인천 시민 지역몰의 이커머스 활성화와 매출 확대를 위해 라이브커머스 시범 운영이 필요했습니다. 시범 운영이었기에 목표는 큰 개발 공수 없이 실제 구매까지 이어지는 라이브커머스 운영이 가능할지 검증하는 것이었습니다. 결과적으로 앱인앱 제약을 해소하기 위해 유튜브 채널을 송출 채널로 채택하여 4회 방송 약 3,900만원 매출을 달성했습니다."
      >
        <ProjectMeta
          items={[
            { k: "프로젝트 기간", v: "1개월" },
            { k: "담당 역할", v: "라이브커머스 운영 기획 · 채널 플로우 설계 · 편성 전략" },
            { k: "팀 구성", v: "전략기획팀 2인 · MD팀 1인 · 개발팀 1인 · 디자인팀 1인" },
            { k: "기여도", v: "기획 50% (실행 협업)" },
          ]}
        />
        <PhaseLead>라이브커머스가 필요했지만 앱은 자체 송출이 불가능한 구조였습니다</PhaseLead>
        <AsIsList
          rows={[
            { k: "기술 제약", v: "앱인앱 구조로 앱 내 자체 라이브 송출 불가" },
            {
              k: "비즈니스 제약",
              v: "지역화폐 결제·프로모션 성과 측정·매출 집계 때문에 최종 결제는 반드시 자사몰 내부 필요",
            },
            {
              k: "리소스 제약",
              v: "스트리밍 인프라 구축은 리소스 낭비, 네이버 등 다른 라이브 채널은 해당 채널 안에서 구매전환 필요",
            },
          ]}
        />
        <PhaseLead>개발 대신 채널을 분리했습니다 — 시청은 밖에서, 결제는 안에서</PhaseLead>
        <div className="sub-project__section">
          <SectionLabel>판단</SectionLabel>
          <p className="text-body" style={{ color: "var(--color-ink-muted-80)" }}>
            시청·소통은 외부(유튜브), 결제·데이터는 내부(자사몰)로 나눠 기능 개발 대신 채널
            조합으로 문제를 풀었습니다.
          </p>
        </div>
        <ScreenshotGallery
          images={[
            {
              src: flowLogicScreen,
              caption:
                "라이브커머스 구좌 진입 → CTA로 유튜브 방송 랜딩 → 실시간 채팅 이벤트 참여 → 채팅창 고정 링크로 상품 상세 랜딩까지 이어지는 실제 UX 흐름",
            },
          ]}
        />
        <div className="sub-project__section">
          <SectionLabel>타겟 & 편성 근거</SectionLabel>
          <AsIsList
            rows={[
              { k: "타겟", v: "인천 시민 복지몰 주 고객층인 4050 여성" },
              {
                k: "편성",
                v: "일요일 저녁 7~9시 (1부 메인 상품 · 2부 서브 상품) — 평일보다 주말 오후 이용 비율이 높고 외부활동이 많은 토요일은 제외해 선정",
              },
            ]}
          />
        </div>
      </Tile>

      {/* PROJECT 04 — 복지플랫폼 마이페이지 */}
      <Tile
        variant="parchment"
        eyebrow="PROJECT 04"
        title="복지플랫폼 마이페이지 개편
반복 VoC를 핵심 재화 접근성 문제로 재정의해 IA/UXUI 전면 개편"
        subcopy="임직원이 지급 받은 복지포인트로 상품을 구매하는 B2B 복지몰 플랫폼입니다. 사용자 대다수가 모바일 앱을 이용했지만 핵심 기능인 복지포인트 현황은 모바일 웹에서만 노출되는 구조였습니다. 마이페이지 개편으로 접근성 문제를 해결하여 정식 런칭 전에는 주 1회 이상 꾸준히 인입되던 복지포인트 관련 문의가 런칭 후 0건으로 줄었습니다."
      >
        <ProjectMeta
          items={[
            { k: "프로젝트 기간", v: "2022.01 ~ 2022.02 (2개월)" },
            { k: "담당 역할", v: "UX 개선점 도출 · 타사 레퍼런스 조사 · UXUI 기획" },
            { k: "팀 구성", v: "전략기획팀 1명 · 디자인팀 1명 · 개발팀 1명" },
            { k: "기여도", v: "기획 100%" },
          ]}
        />
        <PhaseLead>
          주 1회 반복되던 포인트 문의를 단순 문의가 아니라 접근성 문제로 판단했습니다.
        </PhaseLead>
        <AsIsList
          rows={[
            { k: "Why?", v: "포인트가 모바일 웹에서만 노출 → 앱 위주 사용자는 확인 불가" },
            {
              k: "What?",
              v: "① 언제, 왜 지급·회수되었는지 ② 언제, 왜 사용했는지 (잔액만이 아니라 히스토리 수요 확인)",
            },
          ]}
        />
        <PhaseLead>문의가 생기지 않는 구조를 만들었습니다.</PhaseLead>
        <div className="sub-project__section">
          <SectionLabel>레퍼런스 분석 — '포인트·이커머스' 12개 플랫폼</SectionLabel>
          <p className="text-body" style={{ color: "var(--color-ink-muted-80)" }}>
            [3가지 공통점 도출] ① 메인 1 Depth에 포인트 현황 요약 ② 상세 페이지에서
            히스토리 제공 ③ 메뉴 통폐합으로 구조화된 UX/UI → 다만, 기능을 그대로 복제하지 않고 "왜 그
            위치·구조인가"를 분석해 적용했습니다.
          </p>
        </div>
        <div className="sub-project__section">
          <SectionLabel>구현 기능</SectionLabel>
          <AsIsList
            rows={[
              {
                k: "포인트 노출 위치",
                v: "복지포인트 현황 구좌를 메인 최상단 배치 → 진입만으로 잔액 확인",
              },
              {
                k: "히스토리 진입",
                v: "현황 클릭 → 지급/회수/사용 히스토리 + 기간별 조회 필터 랜딩",
              },
              {
                k: "주문 진입 단축",
                v: "진행중 주문 단계 클릭 → 주문내역 바로 랜딩, 스크롤·액션 최소화",
              },
            ]}
          />
        </div>
        <ScreenshotGallery
          images={[
            {
              src: mypageFeatureImprovement,
              caption:
                "구현 기능 — 메뉴 구조화, 핵심 정보 상단 배치, 복지포인트·주문내역 상세 랜딩까지 실제 구현 화면",
            },
          ]}
        />
        <ScreenshotGallery
          images={[
            {
              src: wireframeSpec,
              caption: "복지포인트 상세페이지 화면설계서 — 디자인·개발 협업 산출물로 활용",
            },
          ]}
        />
      </Tile>
    </div>
  );
}
