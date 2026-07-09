import GlobalNav from "../components/GlobalNav";
import Tile from "../components/Tile";
import ComparisonTable from "../components/patterns/ComparisonTable";
import SellerModelComparison from "../diagrams/SellerModelComparison";
import OrderTierStructure from "../diagrams/OrderTierStructure";
import PolicySplitCompare from "../diagrams/PolicySplitCompare";
import PaymentSplitFlow from "../diagrams/PaymentSplitFlow";
import E2EVerificationFlow from "../diagrams/E2EVerificationFlow";
import QAPriorityBreakdown from "../diagrams/QAPriorityBreakdown";
import SettlementDiscrepancy from "../diagrams/SettlementDiscrepancy";
import ExpansionTimeline from "../diagrams/ExpansionTimeline";
import CartFlowShowcase from "../diagrams/CartFlowShowcase";
import FeatureImprovements from "../diagrams/FeatureImprovements";

export default function B2BProject() {
  return (
    <div>
      <GlobalNav />

      <Tile variant="light">
        <p className="tile__eyebrow text-caption-strong">CASE STUDY 01 — B2B 플랫폼 전환</p>
        <h1 className="text-section-heading" style={{ maxWidth: 640 }}>
          B2B 플랫폼으로 전환하며 중개 판매 구조에 맞춰 전 사이클 운영 기준을 다시 세웠습니다
        </h1>
        <p className="text-body" style={{ color: "var(--color-ink-muted-80)", maxWidth: 640 }}>
          자사몰에서 플랫폼으로 넘어오는 과정에서 요구사항과 비즈니스 맥락을 바탕으로 문제를
          정의하고 풀어간 세부 케이스들을 담았습니다.
        </p>
      </Tile>

      <Tile
        variant="dark"
        eyebrow="전환 범위"
        title="커머스 전 영역에 걸쳐 새로 세운 기준"
      >
        <ExpansionTimeline />
      </Tile>

      <Tile
        variant="parchment"
        eyebrow="프로젝트 배경"
        title="단순 리뉴얼이 아닌 플랫폼 전환"
        subcopy="처음에는 B2B몰 리뉴얼로 시작했지만 요구사항을 정리해보니 단순 화면 개선이 아니었습니다. 공급사가 입점하고, 외상 거래를 시스템화하고, 여러 배송지 주문을 한 번에 처리하고, 상품 등록 부담까지 줄여야 했습니다. 그래서 이 프로젝트는 기능 몇 개를 추가하는 일이 아니라 1P와 3P가 함께 운영되는 플랫폼에서 회원·상품·주문·결제·정산 기준을 다시 잡는 일이었습니다."
        footer="자사 제품 직접 판매(1P)와 공급사 입점 상품 판매(3P)가 섞이는 순간, 화면이 아니라 운영 기준 자체를 처음부터 다시 세워야 하는 프로젝트였습니다."
        role={[
          "확장된 요구사항을 정리하며 기존 솔루션 조합으로는 대응이 어렵다고 판단했습니다.",
          "독립몰 기반 입점형 플랫폼 전환 방향을 제안하고 회원·상품·주문·결제·정산 기준을 다시 잡는 기획을 맡았습니다.",
        ]}
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
              reason: "외상 거래와 입금 확인의 수기 관리 부담 최소화 필요",
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
        eyebrow="대전제 · 권한 구조 재설계"
        title="자사와 입점사 운영 모델을 통일한 구조"
        subcopy="자사의 역할은 플랫폼 운영자이면서 동시에 공급사였기 때문에 이 구조를 어떻게 풀 것인가가 먼저였습니다. 플랫폼 운영자 역할로 자사 상품 관리를 하게 되면 결국 예외 관리자 구조가 될 수밖에 없었고 그러면 브랜드나 매입처가 늘 때마다 예외 처리가 반복될 거라고 봤습니다. 그래서 자사도 공급사로 계정을 분리해 동일 어드민 안에서 운영자 계정과 공급사 계정으로 분기하는 방식으로 어드민 개발 공수를 최소화했습니다. 자사 공급사는 내부 브랜드로 지정해 수수료나 등급 할인 같은 운영 정책에서만 예외로 영향을 받도록 설계했습니다."
        footer="1P와 3P를 별도 흐름으로 나누지 않고 같은 Seller 모델에 태우되 자사에만 필요한 정책은 예외로 분리했습니다."
        role={[
          "자사를 관리자 예외로 둘지, 외부 공급사와 같은 Seller로 태울지 두 안을 비교했습니다.",
          "1P/3P가 같은 상품·출고·클레임 흐름을 타도록 Admin/Seller 권한 구조를 설계했습니다.",
        ]}
      >
        <SellerModelComparison />
      </Tile>

      <Tile
        variant="light"
        eyebrow="주문 병목 · 다중 배송지 장바구니"
        title="배송지별 반복 주문을 줄인 장바구니 구조"
        subcopy="운영 모델을 Seller 기준으로 잡은 뒤 실제 주문 경험을 봤을 때, 가장 먼저 보인 병목은 배송지별 반복 주문이었습니다. 위탁배송 구조상 거래처와 운영팀은 배송지별로 주문을 나눠 넣어야 했고 상위 거래처는 하루에도 20~30건을 반복 접수하고 있었습니다. 그래서 단순히 주문 버튼을 편하게 만드는 것이 아니라 상품을 담는 시점부터 배송지를 선택하고 여러 배송지를 한 번에 결제하는 장바구니 구조가 필요했습니다. 다만 내부에서는 공급사와 배송지 기준으로 주문을 다시 나눌 수 있어야 했습니다."
        footer="거래처에게는 여러 배송지를 한 번에 결제하는 경험을 주되 내부에서는 공급사·배송지 기준으로 주문을 나눌 수 있어야 했습니다."
        role={[
          "거래처 설문과 송장 물량 데이터를 함께 보고 배송지별 반복 주문을 핵심 병목으로 정의했습니다.",
          "장바구니에서 최대 20개 배송지까지 담아 한 번에 결제하는 구조를 기획했습니다.",
        ]}
      >
        <CartFlowShowcase />
      </Tile>

      <Tile
        variant="parchment"
        eyebrow="주문 구조 3단계 설계"
        title="결제·배송비·정산 기준을 분리한 3단계 주문 구조"
        subcopy="장바구니에서는 거래처가 여러 배송지를 한 번에 결제하는 경험이 필요했지만 결제 이후 시스템 안에서는 주문이 그대로 한 덩어리로 남아 있으면 운영이 어려웠습니다. 같은 결제 안에서도 공급사, 배송지, 출고지, 묶음배송 여부가 다를 수 있고 상품별로 부분 출고나 취소, 클레임도 발생할 수 있었기 때문입니다. 처음에는 결제와 배송지 또는 결제와 개별 상품으로 나누는 2단계 구조도 검토했지만 각각 배송비·정산·부분 처리 기준에서 한계가 있었습니다. 그래서 결제 기준인 ORD, 배송비와 정산 기준인 GRP, 발주와 클레임 기준인 ITM으로 주문 단위를 나누었습니다."
        footer="주문번호 생성 기준을 3단계로 잡아 1P/3P가 섞인 주문의 출고·배송비·정산이 엉키지 않도록 맞물리게 했습니다."
        role={[
          "결제 → 배송지 묶음, 결제 → 개별 상품 두 가지 구조를 먼저 검토하고 각각의 한계를 확인했습니다.",
          "ORD·GRP·ITM 3단계 주문 구조를 정의하고 각 단계의 역할과 상태값 기준을 설계했습니다.",
        ]}
      >
        <OrderTierStructure />
      </Tile>

      <Tile
        variant="light"
        eyebrow="판매 주체에 따른 결제·정산 구조"
        title="1P·3P 판매 주체별 결제·정산 분리"
        subcopy="1P 자사 상품과 3P 입점사 상품은 판매 당사자가 다르기 때문에 같은 결제 화면 뒤에서도 서로 다른 규칙이 필요했습니다. 통신판매업·통신판매중개업 구조상 입점 상품의 결제대금을 자사 계좌로 직접 수취하면 전자금융거래법 위반 소지가 있다는 법적 리스크까지 겹쳐 있었습니다. 그래서 1P는 기존 거래 규모를 고려해 후불결제를 제한적으로 유지하고 3P는 PG 결제와 지급대행 구조로 자사가 판매대금을 직접 수취하지 않도록 분리했습니다."
      >
        <PolicySplitCompare />
      </Tile>

      <Tile
        variant="dark"
        eyebrow="매출·정산 소명"
        title="PG 계약 주체와 실제 매출 주체의 간극 해소"
        subcopy="앞서 1P와 3P의 결제·정산 기준은 나눴지만 여기서 끝나는 문제가 아니었습니다. PG 계약은 자사 명의로 진행되기 때문에 국세청 매출 신고는 자사 사업자를 기준으로 잡힐 수 있었고 이때 3P 판매대금 전체가 자사 매출이 아니라 공급사에게 정산해야 할 금액과 자사 수수료 매출로 나뉜다는 점을 소명해야 했습니다. 이 부분은 기존 1P 직접 판매 정산만 해오던 재무팀에도 새로운 영역이라 현재 재무팀과 협의하며 전문 회계 검토가 필요한 과제로 정리하고 있습니다."
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
        subcopy="기능을 만들고 단위 테스트를 통과했다고 끝나는 문제가 아니었습니다. 회원·상품·주문·결제·정산이 모두 연결된 플랫폼 특성상 개별 기능이 정상 동작해도 실제 거래 흐름에서는 막히는 지점이 생길 수 있었습니다. 그래서 전체 개발이 끝난 뒤 한 번에 검수하기보다 개발 진행 중 QA를 병행하며 거래 흐름 기준의 E2E 테스트를 먼저 제안했습니다. 기능 단위가 아닌 실사용자 기준으로 회원가입·입점 신청부터 정산까지 하나의 거래가 끝까지 도는지를 검증 기준으로 삼았습니다."
        footer="QA는 버그를 잡아내는 일이 아니라 어떤 이슈가 오픈을 막고 어떤 이슈는 다음 단계로 넘길 수 있는지 기준을 세우는 일이었습니다."
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
          phaseIntro="이슈를 심각도로 분류하는 것과 별개로 언제 열 것인가는 또 다른 판단의 문제였습니다. 유저 시나리오를 기준으로 다시 짚어본 결과 지금 상태로는 실거래를 안정적으로 지탱하기 어렵다고 판단해 바로 오픈하기보다 Phase 2에서 커머스 기능을 보강한 뒤 베타로 여는 방향을 제안했습니다. 현재 Phase 2 개발이 진행 중입니다."
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
        title="애매했던 정산 로직 검증과 정산 4원칙"
        subcopy="134건이라는 숫자보다 중요한 건 그 안에서 어떤 성격의 문제가 잡혔는가였습니다. 정산 QA를 진행하며 정산 산정 기준, 부분반품 처리, 상태값 분리, 원 단위 절사 같은 지점들이 화면마다 다르게 처리되고 있거나 아예 기준 없이 개발되어 있다는 걸 확인했습니다. 실거래가 쌓이기 시작하면 회계 오차가 반복적으로 누적될 수 있는 지점이라 사고가 터지기 전에 개발사와 로직을 하나씩 확인하며 정산이 지켜야 할 기준부터 다시 정리했습니다."
        footer="화면별 수정 요청이 아니라, 애매하게 잡혀 있던 정산 로직을 사고가 나기 전에 원칙 단위로 다시 정의했습니다."
        role={[
          "정산 QA 중 화면마다 다르게 처리되거나 기준 없이 개발돼 있던 정산 로직의 공백을 발견했습니다.",
          "실거래 전 개발사와 로직을 하나씩 확인하며 정산 4원칙과 케이스별 이익/손실 컬럼을 함께 정리했습니다.",
          "셀러 할인이 내부 브랜드가 아닌 전체 공급사 상품에 자동 적용되고 있던 정책 공백도 함께 짚어 내부 브랜드 확인 필드 신설로 이어졌습니다.",
        ]}
      >
        <SettlementDiscrepancy />
      </Tile>

      <Tile
        variant="dark"
        eyebrow="사용자 기능 개선"
        title="거래처·공급사·운영팀의 반복 불편 해소"
        subcopy="커머스 로직 구조 설계에 그치지 않고 플랫폼을 쓰는 거래처·상품을 등록하는 공급사·승인과 안내를 맡는 운영팀이 반복적으로 마주하는 불편을 편의 기능 요구사항으로 구체화했습니다. 거래처 설문에서 재입고·재고 확인 요구가 가장 많아 재입고 문자 알림을 설계했고 공급사 입점 상품이 늘어나는 상황과 상품 정보 개선 요구에 맞춰 상품 상세 상단에 주요 정보를 구조화했습니다. 또 카테고리 특성상 중요한 KC 인증 정보는 운영자가 수기로 매번 확인하지 않도록 API 확인 기능으로 풀었습니다."
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
