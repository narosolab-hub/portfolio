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

export default function B2BProject() {
  return (
    <div>
      <GlobalNav />

      <Tile variant="light">
        <p className="tile__eyebrow text-caption-strong">MAIN PROJECT 01 — B2B 플랫폼 전환</p>
        <h1 className="text-section-heading" style={{ maxWidth: 640 }}>
          B2B 플랫폼으로 전환하며 중개 판매 구조에 맞춰 전 사이클의 운영 기준을 다시 세웠습니다.
        </h1>
        <p className="text-body" style={{ color: "var(--color-ink-muted-80)", maxWidth: 640 }}>
          자사몰(1P)에서 플랫폼(3P)으로 넘어오는 과정에서 요구사항과 비즈니스 맥락을 바탕으로 문제를
          정의하고 풀어간 세부 케이스들을 담았습니다.
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
        variant="dark"
        eyebrow="전환 범위"
        title="커머스 전 영역 0 to 1 설계"
      >
        <ExpansionTimeline />
      </Tile>

      <Tile
        variant="parchment"
        eyebrow="프로젝트 배경"
        title="리뉴얼이 아닌 플랫폼 전환 프로젝트"
        subcopy="처음에는 B2B몰 리뉴얼로 시작했지만 요구사항을 정리해보니 단순 리뉴얼이 아니었습니다. 공급사가 입점하고, 외상 거래를 시스템화하고, 여러 배송지 주문을 한 번에 처리하고, 상품 등록 부담까지 줄여야 했습니다. 이에 1P와 3P 혼합 구조의 플랫폼으로 전환하는 프로젝트로 재정의하고, 회원·상품·주문·결제·정산 기준부터 잡았습니다."
        footer="자사 직접 판매(1P)와 공급사 입점 판매(3P)가 한 플랫폼에서 함께 운영되며 판매 주체가 달라지는 문제를 해결해야 했습니다."

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
        variant="dark"
        eyebrow="운영 모델 대전제"
        title="자사와 입점사 운영 모델을 통일한 구조"
        subcopy="자사는 플랫폼 운영 주체이자 판매자였기에 두 역할의 권한을 명확히 분리했습니다. 자사 상품 관리를 관리자 예외 기능으로 두면 신규 브랜드 런칭마다 운영·정산 예외 처리가 반복돼 개발 공수가 커지는 구조였습니다. 때문에 자사도 외부 공급사와 같은 Seller 모델에 태우고, 자사에만 필요한 수수료 0%·B2B 등급 할인만 정책 예외로 분리했습니다."

      >
        <SellerModelComparison />
      </Tile>

      <Tile
        variant="light"
        eyebrow="다중 배송지 장바구니 일괄 결제"
        title="담는 순간부터 배송지 기반 자동 분리"
        subcopy="실제 거래처의 주문 경험을 보았을 때, 위탁배송 특성상 배송지가 일정하지 않았고 상위 거래처는 하루 20~30건의 배송지별 주문을 반복했습니다. (기존 거래처 기준 월평균 약 4,500건) 장바구니에 상품을 담는 시점부터 배송지를 선택하고 여러 배송지를 한 번에 결제하는 구조가 필요했으며, 시스템에서는 공급사와 배송지 기준으로 주문을 분리해야 했습니다."
        footer="거래처에게는 여러 배송지를 한 번에 결제하는 경험을 주되 내부에서는 공급사·배송지 기준으로 주문을 나누었습니다."
        role={[
          "거래처 설문과 송장 물량 데이터를 함께 보고 배송지별 반복 주문을 핵심 병목으로 정의했습니다.",
          "장바구니에서 최대 20개 배송지까지 담아 한 번에 결제하는 구조를 기획했습니다.",
        ]}
      >
        <CartFlowShowcase />
      </Tile>

      <Tile
        variant="parchment"
        eyebrow="3단계 주문 구조"
        title="결제·배송비·정산 기준을 분리한 3단계 주문 구조"
        subcopy="장바구니 일괄 결제 기능 이후 시스템 안에서는 주문이 하나로 묶이면 운영이 어려웠습니다. 같은 결제 안에서도 공급사·배송지·출고지·묶음배송 여부가 다르고, 상품별로 부분 출고나 취소, 클레임도 발생하기 때문입니다. 초기에는 [결제 및 배송지] 혹은 [결제 및 개별 상품]으로 나누는 2단계 구조를 검토했지만 각각 배송비·정산·부분 처리 기준에서 한계가 있었습니다. 최종적으로는 결제 기준인 ORD, 배송비와 정산 기준인 GRP, 발주와 클레임 기준인 ITM으로 주문 단위를 나누었습니다."
        footer="주문번호 생성 기준을 3단계로 잡아 1P·3P가 섞인 주문의 출고·배송비·정산이 엉키지 않도록 맞물리게 했습니다."
        role={[
          "결제 → 배송지 묶음, 결제 → 개별 상품 두 가지 구조를 먼저 검토하고 각각의 한계를 확인했습니다.",
          "ORD·GRP·ITM 3단계 주문 구조를 정의하고 각 단계의 역할과 상태값 기준을 설계했습니다.",
        ]}
      >
        <OrderTierStructure />
      </Tile>

      <Tile
        variant="light"
        eyebrow="결제·정산 구조"
        title="판매 주체에 따른 결제·정산 분리"
        subcopy="자사 상품과 입점사 상품은 판매 주체가 다르기 때문에 일괄 결제 이후 서로 다른 규칙이 필요했습니다. 통신판매중개업 구조상 입점 상품의 결제대금을 자사 계좌로 직접 수취하면 전자금융거래법에 위반되는 법적 리스크도 있었습니다. 이에 1P는 기존 거래 규모를 고려해 후불결제(외상거래)를 제한적으로 유지하고 3P는 PG를 통한 결제대행 및 지급대행 구조로 자사가 판매대금을 직접 수취하지 않도록 분리했습니다."
      >
        <PolicySplitCompare />
      </Tile>

      <Tile
        variant="dark"
        eyebrow="매출·정산 소명"
        title="PG 계약 주체와 실제 매출 주체의 간극 해소"
        subcopy="앞서 1P와 3P의 결제·정산 기준을 나눈 후에는 매출 신고에 대한 문제가 있었습니다. PG 계약은 자사 명의로 진행되어 국세청 매출 신고는 자사 사업자를 기준으로 잡혔습니다. 때문에 3P 판매대금 전체가 자사 매출이 아니라 공급사에게 정산해야 할 금액과 자사 수수료 매출로 나뉜다는 점을 소명해야 했습니다. 이 부분은 기존 1P 직접 판매 정산만 해오던 재무팀에도 새로운 영역이라 현재 재무팀과 협의하며 전문 회계 검토가 필요한 과제로 정리하고 있습니다."
        footer="결제·정산 기준을 나눈 뒤 1P 매출·3P 공급사 정산금·자사 수수료를 구분해 소명할 수 있는 자료 기준을 재무팀과 함께 검토 과제로 정리했습니다."
        role={[
          "PG 계약 주체와 실제 판매 주체가 달라질 때 생기는 매출 신고·정산 소명 이슈를 발견했습니다.",
          "세금계산서 API 연동은 초기 오픈 범위에서 제외하고 홈택스 발행 양식에 맞춘 정산 데이터 추출을 운영 대안으로 협의했습니다.",
        ]}
      >
        <PaymentSplitFlow />
      </Tile>

      <Tile
        variant="light"
        eyebrow="운영 가능성 검증 · E2E QA 설계"
        title="기능 단위가 아닌 거래 흐름 기준 QA"
        subcopy="회원·상품·주문·결제·정산이 모두 연결된 플랫폼 특성상 개별 기능이 정상 동작해도 실제 거래 흐름에서는 막히는 지점이 생길 수 있습니다. 또한, 범위가 큰 만큼 전체 개발이 끝난 뒤 한 번에 검수하기보다 개발 진행 중 QA를 병행하며 거래 흐름 기준의 E2E 테스트를 먼저 제안했습니다. 기능 단위가 아닌 실사용자 기준으로 회원가입·입점 신청부터 정산까지 시나리오가 끝까지 진행되는지를 검증 기준으로 삼았습니다."
        footer="QA는 단순히 버그를 찾아내는 것이 아니라 Go-Live/No-Go 사인이었습니다."
        role={[
          "완료 후 일괄 QA로는 리스크 발견이 늦다고 판단해 개발·QA 병행 방식을 개발사에 먼저 제안했습니다.",
          "발견한 134건을 P0~P3로 분류하고 Phase 1과 Phase 2로 나누어 Go-Live 기준을 정리했습니다.",
        ]}
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
        eyebrow="운영 가능성 검증 · P0 케이스 딥다이브"
        title="기준이 없던 정산 로직 검증과 정산 4원칙"
        subcopy="134건의 이슈라이징을 하며 가장 문제가 컸던 케이스 중 하나입니다. 정산 QA를 진행하며 정산 산정 기준, 부분반품 처리, 상태값 분리, 원 단위 절사 같은 지점들이 화면마다 다르게 처리되거나 아예 기준 없이 개발되었다는 걸 확인했습니다. 실거래가 쌓이면 회계 오차가 반복적으로 누적될 수 있는 지점으로 오픈 전 개발사와 로직을 하나씩 확인하며 정산 기준부터 다시 정리했습니다."
        footer="화면별 수정 요청보다는 정산 로직을 오픈 전에 원칙 단위로 다시 정의하여 리소스를 줄였습니다."
        role={[
          "정산 QA 중 화면마다 다르게 처리되거나 기준 없이 개발돼 있던 정산 로직의 공백을 발견했습니다.",
          "셀러 할인이 내부 브랜드가 아닌 전체 공급사 상품에 자동 적용되고 있던 정책 공백도 함께 짚어 내부 브랜드 확인 필드 신설로 이어졌습니다.",
        ]}
      >
        <SettlementDiscrepancy />
      </Tile>

      <Tile
        variant="dark"
        eyebrow="사용자 기능 개선"
        title="거래처·공급사·운영팀의 반복 불편 해소"
        subcopy="커머스 로직 구조 설계뿐만 아니라 플랫폼의 주요 사용자인 구매자(거래처)·판매자(공급사)·관리자(운영팀)가 반복적으로 마주하는 불편을 편의 기능 요구사항으로 구체화했습니다. 거래처 설문에서 재입고·재고 확인 요구가 가장 많아 재입고 알림 시스템을 설계하고, 공급사 입점 상품이 늘어나는 상황과 상품 정보 개선 요구에 맞춰 상품 주요 정보를 구조화했습니다. 또 카테고리 특성상 중요한 KC 인증 정보는 운영자가 수기로 매번 확인하지 않도록 API 확인 기능으로 풀었습니다."
        role={[
          "거래처 설문과 운영팀 업무 흐름을 함께 보고 반복적으로 막히는 접점을 정의했습니다.",
          "재입고 문자 알림, 상품 상세 주요 정보 구조화, KC 인증 API 확인 기능의 요구사항을 정리했습니다.",
        ]}
      >
        <FeatureImprovements />
      </Tile>
    </div>
  );
}
