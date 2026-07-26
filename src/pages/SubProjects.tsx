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
import type { Variant } from "../variants";
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

export default function SubProjects({ variant }: { variant?: Variant }) {
  // 공고별 문구 override. 없으면 아래 기본 문구가 그대로 쓰입니다(순수 fallback).
  const ov = variant?.subPage;
  const sec = (id: string) => ov?.sections?.[id] ?? {};

  return (
    <div>
      <GlobalNav />

      <Tile variant="light">
        <p className="tile__eyebrow text-caption-strong">SUB PROJECTS</p>
        <h1 className="text-section-heading">
          {ov?.intro?.title ?? "각기 다른 제약 속에서 근본적인 문제를 해결한 서브 프로젝트"}
        </h1>
        <p className="text-body" style={{ color: "var(--color-ink-muted-80)" }}>
          {ov?.intro?.body ??
            "오프라인 영업 확장에 따른 수기 바코드 매칭은 자동화 웹앱 개발로 해소하고, 앱인앱 환경의 라이브 송출 제약은 채널 분할을 통해 단기간에 매출을 창출했으며, 반복되던 복지포인트 문의는 UX 개편으로 원인을 근본적으로 해결했습니다."}
        </p>
      </Tile>

      {/* PROJECT 02 — 표준바코드 매칭 자동화 */}
      <Tile
        variant="parchment"
        eyebrow={sec("barcode").eyebrow ?? "PROJECT 02"}
        title={sec("barcode").title ?? "상품바코드 매칭 프로세스 개선: 2시간 수기 작업을 10분으로 단축"}
        subcopy={
          sec("barcode").subcopy ?? (
            <>
              오프라인 영업 확대로 표준바코드(코리아넷) 관리가 필수적이었으나, 온라인 중심 시스템의
              데이터 불일치로 1건당 수기 대조가 필요했습니다. 사내 IT 리소스가 부족한 상황에서{" "}
              <strong>AI를 활용해 자동화 툴을 직접 개발</strong>했습니다. 상품명 표기 차이 등의 예외를
              정규화하고 유사코드 추천 로직을 반영해, 2시간 이상 소요되던 대조 작업을{" "}
              <strong>10분 내외로 단축</strong>했습니다. 이를 통해 4개월간 방치되었던{" "}
              <strong>1,000건 이상의 백로그를 전면 해소</strong>했습니다.
            </>
          )
        }
      >
        <ProjectMeta
          items={[
            { k: "프로젝트 기간", v: "1주 (단기 스프린트)" },
            { k: "담당 역할", v: "문제 정의 및 매칭 로직 설계, 자동화 웹앱 자체 개발" },
            { k: "팀 구성", v: "1인 단독 수행" },
            { k: "기여도", v: "100%" },
          ]}
        />
        <div className="sub-project__section">
          <SectionLabel>문제 · 현황</SectionLabel>
          <AsIsList
            rows={[
              {
                k: "수기 프로세스",
                v: "코리아넷·사내 재고 엑셀 다운로드 → 상품명 기준 엑셀 데이터 가공 및 매핑 → 누락 및 불일치 데이터 수기 대조·확인 → 바코드 추출 및 시스템 재업로드",
              },
              { k: "매칭 불가", v: "두 시스템 간 상품명·코드 표기 상이(오타, 숫자 누락)로 매핑 실패 건 다수 발생" },
              { k: "백로그", v: "약 5,000 SKU 대조 2시간+ → 작업 포기 → 4개월간 약 1,000건 방치" },
              {
                k: "리소스 제약",
                v: "사내 IT개발팀 리소스 한계로 AI(GPT·Claude)를 활용해 직접 개발",
              },
            ]}
          />
        </div>
        <div className="sub-project__section">
          <SectionLabel>설계 판단</SectionLabel>
          <AsIsList
            rows={[
              {
                k: "매칭 키 선정",
                v: "띄어쓰기·표현 차이 한계 극복 → 상품명 끝 고유 코드를 매칭 키로 확정",
              },
              {
                k: "입력값 정규화",
                v: "오타·공백·특수문자 등 예외 케이스를 정규화하여 매칭률 상향",
              },
              {
                k: "유사코드 추천",
                v: "정규화 범위를 벗어난 오타는 유사코드 자동 추천 로직 적용 (예: S2500960 vs S2500690)",
              },
              {
                k: "패턴 누적",
                v: "패턴을 반복 검증하고 검증 완료된 패턴을 누적해 매칭률 제고",
              },
            ]}
          />
        </div>
        <div className="sub-project__section">
          <SectionLabel>프로세스 개선</SectionLabel>
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
                caption: "3개 상태로 분류된 매칭 결과 화면",
              },
            ]}
          />
        </div>
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
        eyebrow={sec("live").eyebrow ?? "PROJECT 03"}
        title={sec("live").title ?? "라이브커머스 시범 운영: 채널 분할 전략으로 3,900만 원 매출 달성"}
        subcopy={
          sec("live").subcopy ?? (
            <>
              인천 시민 지역몰(가입자 <strong>226만</strong>)의 이커머스 활성화를 위한 라이브커머스
              시범 사업입니다. 대규모 개발 투자 없이 실제 구매 전환이 가능한지 검증하는 것이 핵심
              목표였습니다. 앱인앱 구조상 앱 내 자체 스트리밍 인프라 구축이 불가능했기에, 시청·소통은
              유튜브(외부 채널), 결제·데이터는 자사몰(내부 플랫폼)로 나누는{" "}
              <strong>'채널 분할' 전략</strong>으로 우회했습니다. 그 결과 단{" "}
              <strong>4회 방송으로 약 3,900만 원</strong>의 매출을 달성하며 비즈니스 가능성을
              입증했습니다.
            </>
          )
        }
      >
        <ProjectMeta
          items={[
            { k: "프로젝트 기간", v: "2021.06 ~ 2021.07 (1개월, 시범 운영)" },
            { k: "담당 역할", v: "운영 기획, 채널 플로우(유튜브+자사몰) 설계, 방송 편성 전략 수립" },
            { k: "팀 구성", v: "전략기획 2명, MD 1명, 개발 1명, 디자인 1명" },
            { k: "기여도", v: "기획 50% (실행 협업 리드)" },
          ]}
        />
        <div className="sub-project__section">
          <SectionLabel>제약 조건</SectionLabel>
          <AsIsList
            rows={[
              { k: "기술 제약", v: "앱인앱 구조로 앱 내 자체 라이브 송출 불가" },
              {
                k: "비즈니스 제약",
                v: "지역화폐 결제·프로모션 성과 측정·매출 집계 때문에 최종 결제는 반드시 자사몰 내부 필요",
              },
              {
                k: "인프라·채널 제약",
                v: "자체 스트리밍 인프라 구축은 과한 투자였고 네이버 등 외부 라이브 채널은 해당 채널 안에서만 구매 전환이 강제됨",
              },
            ]}
          />
        </div>
        <div className="sub-project__section">
          <SectionLabel>해결 · 채널 분할 흐름</SectionLabel>
          <ScreenshotGallery
            images={[
              {
                src: flowLogicScreen,
                caption:
                  "라이브커머스 구좌 진입 → CTA로 유튜브 방송 랜딩 → 실시간 채팅 이벤트 참여 → 채팅창 고정 링크로 상품 상세 랜딩까지 이어지는 실제 UX 흐름",
              },
            ]}
          />
        </div>
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
        className="export-break-before"
        eyebrow={sec("mypage").eyebrow ?? "PROJECT 04"}
        title={sec("mypage").title ?? "복지플랫폼 마이페이지 개편: UX/IA 재설계로 관련 문의 0건 달성"}
        subcopy={
          sec("mypage").subcopy ?? (
            <>
              B2B 복지몰 특성상 복지포인트 관리가 핵심 기능이나, 모바일 앱 사용자가 대다수임에도
              포인트 현황은 웹에서만 확인 가능한 구조적 한계가 있었습니다. 이를 단순 CS 인입이 아닌{" "}
              <strong>UI/UX 접근성 문제로 재정의</strong>하고, 12개 주요 커머스 플랫폼의 패턴을 분석해
              사용자가 묻기 전에 직관적으로 확인(상단 요약, 상세 히스토리, 메뉴 통폐합)할 수 있는 구조로
              마이페이지를 재설계했습니다. 그 결과 <strong>주 1~3회</strong> 꾸준히 발생하던 포인트 관련
              문의를 <strong>런칭 후 0건</strong>으로 근절했습니다.
            </>
          )
        }
      >
        <ProjectMeta
          items={[
            { k: "프로젝트 기간", v: "2022.01 ~ 2022.02 (2개월)" },
            { k: "담당 역할", v: "CS 데이터 기반 문제 재정의, 타사 레퍼런스 분석, IA·UX/UI 기획" },
            { k: "팀 구성", v: "전략기획 1명, 디자인 1명, 개발 1명" },
            { k: "기여도", v: "기획 100% (단독 기획)" },
          ]}
        />
        <div className="sub-project__section">
          <SectionLabel>문제 정의</SectionLabel>
          <AsIsList
            rows={[
              { k: "현상", v: "포인트가 모바일 웹에서만 노출 → 앱 위주 사용자는 확인 불가" },
              {
                k: "진짜 문제",
                v: "① 언제, 왜 지급·회수되었는지 ② 언제, 왜 사용했는지 (잔액만이 아니라 히스토리 수요 확인)",
              },
            ]}
          />
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
