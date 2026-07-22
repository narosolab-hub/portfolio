import GlobalNav from "../components/GlobalNav";
import Tile from "../components/Tile";
import ComparisonTable from "../components/patterns/ComparisonTable";
import ProjectMeta from "../components/patterns/ProjectMeta";
import CartFlowShowcase from "../diagrams/CartFlowShowcase";
import E2EVerificationFlow from "../diagrams/E2EVerificationFlow";
import ExpansionTimeline from "../diagrams/ExpansionTimeline";
import FeatureImprovements from "../diagrams/FeatureImprovements";
import OrderTierStructure from "../diagrams/OrderTierStructure";
import PaymentSplitFlow from "../diagrams/PaymentSplitFlow";
import PolicySplitCompare from "../diagrams/PolicySplitCompare";
import QAPriorityBreakdown from "../diagrams/QAPriorityBreakdown";
import SellerModelComparison from "../diagrams/SellerModelComparison";
import SettlementDiscrepancy from "../diagrams/SettlementDiscrepancy";
import type { Variant } from "../variants";

export default function B2BProject({ variant }: { variant?: Variant }) {
  // 공고별 문구 override. 없으면 아래 기본 문구가 그대로 쓰입니다(순수 fallback).
  const ov = variant?.b2bPage;
  const sec = (id: string) => ov?.sections?.[id] ?? {};

  return (
    <div>
      <GlobalNav />

      <Tile variant="light">
        <p className="tile__eyebrow text-caption-strong">MAIN PROJECT 01 — B2B 플랫폼 전환</p>
        <h1 className="text-section-heading" style={{ maxWidth: 640 }}>
          {ov?.intro?.title ?? "입점형 플랫폼 전환 구축 프로젝트"}
        </h1>
        <p className="text-body" style={{ color: "var(--color-ink-muted-80)", maxWidth: 640 }}>
          {ov?.intro?.body ??
            "연 거래액 24억·거래처 약 340개의 자사 직판(1P) B2B몰을, 여러 공급사가 함께 파는 입점형 플랫폼(3P)으로 전환했습니다. 회원·상품·주문·결제·정산까지 운영 기준을 0 to 1로 다시 설계했습니다."}
        </p>
        <ProjectMeta
          items={[
            { k: "프로젝트 기간", v: "2025.08 ~ 진행 중\n2026.09 베타 오픈 목표" },
            { k: "담당 역할", v: "요구사항 정의, 정책 · 구조 설계,\n외주 커뮤니케이션, QA 기준 수립" },
            { k: "팀 구성", v: "플랫폼기획팀 · 기획 전담 1인\n협업: 외주 개발사, 운영 · 재무팀" },
            { k: "기여도", v: "기획 90%" },
          ]}
        />
      </Tile>

      <Tile
        variant="parchment"
        eyebrow={sec("background").eyebrow ?? "프로젝트 배경"}
        title={sec("background").title ?? "리뉴얼이 아닌 플랫폼 전환 프로젝트"}
        subcopy={
          sec("background").subcopy ?? (
            <>
              <strong>연 24억·거래처 약 340개</strong> 규모의 B2B 폐쇄몰 리뉴얼로 시작했지만
              요구사항을 정리해보니 단순 리뉴얼이 아니었습니다. 자사 제조·사입 상품만으로는 재고
              부담 탓에 카테고리 확장에 한계가 있어 <strong>외부 공급사 입점</strong>이 전사 방향으로
              정해졌고 기존 직판 모델과 카페24로는 한 주문에 여러 공급사·배송지·상품이 섞이는 거래를
              감당할 수 없었기 때문입니다. 그래서 <strong>1P·3P 혼합 입점형 플랫폼으로 전환</strong>하는
              프로젝트로 재정의하고 회원·상품·주문·결제·정산 기준부터 새로 잡았습니다.
            </>
          )
        }
      >
        <ComparisonTable
          rows={[
            {
              aspect: "판매 구조",
              before: "자사 제조/사입 상품 중심",
              reason: "창고·재고 부담을 줄이면서 카테고리 확장 필요",
              after: "자사 상품 + 공급사 입점 상품",
            },
            {
              aspect: "운영 관리",
              before: "외상 거래 + 무통장 입금",
              reason: "외상 거래와 수기 입금 확인 부담 최소화 필요",
              after: "선결제 우선 + 후불 거래 자동화",
            },
            {
              aspect: "주문 경험",
              before: "위탁배송 기반 배송지별 개별 주문",
              reason: "다중 배송지 주문·결제 과정 간소화 필요",
              after: "다중 배송지 장바구니 일괄 결제",
            },
            {
              aspect: "상품 등록",
              before: "거래처 상품을 외부마켓에 개별 등록",
              reason: "상품 등록 부담을 줄여 신상품 소싱 확대 필요",
              after: "API 연동 기반 상품 등록 지원",
            },
          ]}
        />
      </Tile>

      <Tile
        variant="light"
        eyebrow={sec("expansion").eyebrow ?? "전환 범위"}
        title={sec("expansion").title ?? "커머스 전 영역 0 to 1 설계"}
      >
        <ExpansionTimeline />
      </Tile>

      <Tile
        variant="parchment"
        eyebrow={sec("seller-model").eyebrow ?? "운영 모델 대전제"}
        title={sec("seller-model").title ?? "자사와 입점사 운영 모델을 통일한 구조"}
        subcopy={
          sec("seller-model").subcopy ?? (
            <>
              자사는 플랫폼 <strong>운영 주체이자 판매자</strong>인 이중 구조였습니다. 자사 상품을
              관리자 예외 기능으로 두면 신규 브랜드를 런칭할 때마다 운영·정산 예외 처리가 반복돼 개발
              공수가 계속 늘어나는 구조였습니다. 그래서 <strong>자사도 외부 공급사와 같은 Seller
              모델에 편입</strong>하고 수수료 0%·B2B 등급 할인처럼 자사에만 필요한 부분만 정책
              예외로 분리해 <strong>예외 없는 단일 운영 구조</strong>를 만들었습니다.
            </>
          )
        }

      >
        <SellerModelComparison />
      </Tile>

      <Tile
        variant="light"
        className="export-break-before"
        eyebrow={sec("cart").eyebrow ?? "다중 배송지 장바구니 일괄 결제"}
        title={sec("cart").title ?? "담는 순간부터 배송지 기반 자동 분리"}
        subcopy={
          sec("cart").subcopy ?? (
            <>
              거래처가 자기 고객 주소로 바로 보내는 <strong>위탁배송</strong> 구조라 주문마다 배송지가
              달랐습니다. 상위 거래처는 배송지가 다른 주문을 <strong>하루 20~30건씩 개별 입력</strong>했고
              기존 거래처 기준 월평균 약 4,500건에 달했습니다. 거래처 설문과 송장 물량 데이터로
              배송지별 반복 주문을 핵심 병목으로 정의하고, 장바구니에 담는 시점부터 최대 20개
              배송지까지 지정해 <strong>한 번에 결제하되 내부에서는 공급사·배송지 기준으로 주문을
              나누는 구조</strong>를 기획했습니다.
            </>
          )
        }
      >
        <CartFlowShowcase />
      </Tile>

      <Tile
        variant="parchment"
        className="export-break-before"
        eyebrow={sec("order-tier").eyebrow ?? "3단계 주문 구조"}
        title={sec("order-tier").title ?? "결제·배송비·정산 기준을 분리한 3단계 주문 구조"}
        subcopy={
          sec("order-tier").subcopy ??
          "장바구니 일괄 결제 이후 주문을 하나의 단위로 묶어두면 운영이 막혔습니다. 같은 결제 안에서도 공급사·배송지·출고지가 다르고 상품별로 부분 출고·취소·클레임이 따로 발생하기 때문입니다. 결제·배송지 묶음과 결제·개별 상품 두 가지 2단계 구조를 먼저 검토해 한계를 확인한 뒤, 최종적으로 결제(ORD)·정산(GRP)·발주·클레임(ITM) 3단계로 주문 단위를 나누고 각 단계의 역할과 상태값 기준을 설계했습니다."
        }
      >
        <OrderTierStructure />
      </Tile>

      <Tile
        variant="light"
        className="export-break-before"
        eyebrow={sec("payment-policy").eyebrow ?? "결제·정산 구조"}
        title={sec("payment-policy").title ?? "판매 주체에 따른 결제·정산 분리"}
        subcopy={
          sec("payment-policy").subcopy ?? (
            <>
              자사 상품과 입점사 상품은 판매 주체가 달라 일괄 결제 이후 서로 다른 규칙이
              필요했습니다. 통신판매중개업 구조상 입점 상품의 결제대금을 자사 계좌로 직접 수취하면{" "}
              <strong>전자금융거래법 위반</strong>이었고 핵심 거래처를 유지하려면 외상거래는 포기할
              수 없었습니다. 그래서 <strong>3P는 PG 결제대행·지급대행</strong>으로 자사가 판매대금을
              직접 수취하지 않게 하고 <strong>1P는 후불결제를 제한적으로 유지</strong>했습니다.
            </>
          )
        }
      >
        <PolicySplitCompare />
      </Tile>

      <Tile
        variant="parchment"
        className="export-break-before"
        eyebrow={sec("settlement-proof").eyebrow ?? "매출·정산 소명"}
        title={sec("settlement-proof").title ?? "PG 계약 주체와 실제 매출 주체의 간극 해소"}
        subcopy={
          sec("settlement-proof").subcopy ?? (
            <>
              1P·3P로 결제 기준을 나누면서 매출 신고 방식도 달라졌습니다. 플랫폼 특성상 PG로 발생한
              결제대금은 전체가 <strong>자사 명의로 국세청에 신고</strong>되지만 실제 자사 매출은
              수수료뿐이고 나머지는 공급사에 줄 정산대금입니다. 같은 PG 결제라도{" "}
              <strong>계약 주체와 매출 주체가 달라</strong> 실제 매출분을 구분해 소명해야 하는 이슈를
              오픈 전에 선제 발견해, <strong>3P 판매대금을 공급사 정산금과 자사 수수료 매출로 구분</strong>하는
              소명 데이터 기준을 재무팀과 정리했습니다.
            </>
          )
        }
      >
        <PaymentSplitFlow />
      </Tile>

      <Tile
        variant="light"
        eyebrow={sec("e2e-qa").eyebrow ?? "운영 가능성 검증 · E2E QA 설계"}
        title={sec("e2e-qa").title ?? "기능 단위가 아닌 거래 흐름 기준 QA"}
        subcopy={
          sec("e2e-qa").subcopy ?? (
            <>
              회원·상품·주문·결제·정산이 모두 연결된 플랫폼이라 개별 기능이 정상 동작해도 실제 거래
              흐름에서는 막히는 지점이 생겼습니다. 또한, 범위가 큰 만큼 개발이 다 끝난 뒤 한 번에
              검수하면 리스크 발견이 늦어질 수 있었습니다. 때문에 개발 중 QA를 병행하는{" "}
              <strong>거래 흐름 기준 E2E 테스트</strong>를 먼저 제안했고 기능 단위가 아니라{" "}
              <strong>회원가입·입점 신청부터 정산까지</strong> 시나리오가 끝까지 이어지는지를 오픈
              기준으로 삼았습니다. 그렇게 설계한 E2E QA에서 발견한 <strong>134건을 P0~P3로 분류</strong>하고
              Phase 1·2로 나누어 Go-Live 기준을 정리했습니다.
            </>
          )
        }
      >
        <E2EVerificationFlow />
        <QAPriorityBreakdown
          title="QA에서 발견한 이슈 (Phase1 기준)"
          items={[
            {
              label: "P0",
              count: 44,
              description: "테스트 자체 불가 또는 법무·회계 등 오픈 시 치명적 리스크",
            },
            {
              label: "P1",
              count: 43,
              description: "기능·로직 결함으로 정상 거래 흐름이 막히는 항목",
            },
            { label: "P2", count: 28, description: "운영 편의를 위한 개선 필요" },
            { label: "P3", count: 19, description: "UI·카피 등 완성도 항목" },
          ]}
          phaseIntro="이슈를 심각도로 분류하는 것과 별개로 언제 오픈이 가능한가를 판단하는 부분도 문제였습니다.
유저 시나리오를 기준으로 판단했을 때, 지금 상태로는 실제 거래를 안정적으로 운영하기 어렵다고 판단해 바로 오픈보다 Phase 2에서 커머스 기능을 보강한 뒤 베타로 오픈하는 방향을 제안했습니다. 현재는 Phase 2 개발이 진행 중입니다."
          phaseRows={[
            {
              phase: "Phase 1",
              criteria: "기본 커머스 구조 뼈대 구축",
              example: "회원 · 상품 · 주문 · 결제 · 배송 · 클레임 · 정산 등 커머스 기본 기능",
            },
            {
              phase: "Phase 2",
              criteria: "오픈 전 반드시 해결해야 하는 항목",
              example: "정산 산정 기준 오류, 가상계좌 환불 계좌 수집, 맞교환 기능, 상태값 매트릭스",
            },
            {
              phase: "런칭 직전 재검수",
              criteria: "거래 흐름을 막지는 않지만 완성도에 영향",
              example: "UI/카피, 안내 문구, 단순 노출 오류",
            },
          ]}
        />
      </Tile>

      <Tile
        variant="parchment"
        eyebrow={sec("settlement-logic").eyebrow ?? "운영 가능성 검증 · P0 케이스 딥다이브"}
        title={sec("settlement-logic").title ?? "기준이 없던 정산 로직 검증과 정산 3원칙"}
        subcopy={
          sec("settlement-logic").subcopy ?? (
            <>
              134건 가운데 가장 문제가 컸던 케이스입니다. 정산 QA를 진행하다 정산 산정 기준·상태값
              분리·원 단위 절사 같은 지점이 화면마다 다르게 처리되는 걸 확인했습니다. 실거래가 쌓이면{" "}
              <strong>회계 오차가 계속 누적될</strong> 수 있는 지점이라, 오픈 전 개발사와 로직을 하나씩
              맞추며 정산 산정·상태값·절사를 화면이 아니라 <strong>로직 원칙으로 다시 정의</strong>했습니다.
              셀러 할인이 내부 브랜드가 아니라 전체 공급사 상품에 자동 적용되던 정책 공백도 함께 짚어
              내부 브랜드 확인 필드 신설로 이어갔습니다.
            </>
          )
        }
      >
        <SettlementDiscrepancy />
      </Tile>

      <Tile
        variant="light"
        eyebrow={sec("feature-improve").eyebrow ?? "사용자 기능 개선"}
        title={sec("feature-improve").title ?? "거래처·공급사·운영팀의 반복 불편 해소"}
        subcopy={
          sec("feature-improve").subcopy ?? (
            <>
              구조 설계만큼이나 플랫폼의 실사용자인 구매자(거래처)·판매자(공급사)·운영자(운영팀)가
              반복해서 겪는 불편도 기능 요구사항으로 정리했습니다. <strong>거래처 설문 최다 요구와
              운영팀의 반복 업무</strong>를 기준으로 개발 공수 대비 체감이 큰 기능부터 정해, 구매자에게는
              품절 상품 재입고 SMS 알림을, 운영자에게는 수기로 확인하던 KC 인증을 API 조회로 전환하는
              기능을 기획했습니다. 상품 상세의 주요 정보(판매가·배송·소포장 단위)도 상단에 통합해 구매
              판단에 필요한 정보를 한눈에 볼 수 있게 구조화했습니다.
            </>
          )
        }
      >
        <FeatureImprovements />
      </Tile>
    </div>
  );
}
