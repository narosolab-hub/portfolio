import GlobalNav from "../components/GlobalNav";
import Tile from "../components/Tile";
import SellerModelComparison from "../diagrams/SellerModelComparison";
import SettlementDiscrepancy from "../diagrams/SettlementDiscrepancy";
import OrderTierStructure from "../diagrams/OrderTierStructure";

export default function Pilot() {
  return (
    <div>
      <GlobalNav />

      <Tile variant="light">
        <p className="tile__eyebrow text-caption-strong">도식화 파일럿</p>
        <h1 className="text-hero-display">
          B2B몰 리뉴얼은 결국,
          <br />
          판매·출고·정산 주체가 바뀌는
          <br />
          플랫폼 전환이었습니다
        </h1>
        <p className="text-lead" style={{ color: "var(--color-ink-muted-80)", maxWidth: 640 }}>
          3종 다이어그램 검증용 페이지 — 애플 디자인 언어(단일 블루 액센트,
          라이트/파치먼트/다크 타일 리듬)로 다시 잡았습니다.
        </p>
      </Tile>

      <Tile
        variant="dark"
        eyebrow="대전제 — 권한 구조 재설계"
        title="자사도 외부 공급사와 같은 입점사로 분리해, 운영 모델을 하나로 통일했습니다"
        subcopy="자사를 관리자 예외로 둘지, Seller로 편입할지를 비교했습니다. 예외로 두면 브랜드가 늘 때마다 예외 로직이 반복되지만, Seller로 태우면 공통 흐름은 그대로 두고 자사 전용 정책만 예외로 분리할 수 있었습니다."
        footer="1P와 3P를 별도 흐름으로 나누지 않고 같은 Seller 모델에 태우되, 자사에만 필요한 정책은 예외로 분리했습니다."
      >
        <SellerModelComparison />
      </Tile>

      <Tile
        variant="light"
        eyebrow="P0 딥다이브 — 정산 산정 기준 불일치"
        title="같은 주문인데 메뉴마다 정산 기준이 달랐습니다"
        subcopy="주문 내역은 실구매가 1,914원 기준으로 보였지만, 정산 내역은 판매가 2,200원 기준으로 집계되고 있었습니다. 모르고 오픈했다면 매월 회계 오차가 누적될 문제였습니다."
        footer="같은 유형의 문제가 반복되지 않도록, 화면별 수정 요청이 아니라 정산이 지켜야 할 기준을 먼저 정의했습니다."
      >
        <SettlementDiscrepancy />
      </Tile>

      <Tile
        variant="parchment"
        eyebrow="주문 처리 구조 — ORD·GRP·ITM 3단계"
        title="한 번의 결제를 출고·배송비·정산 기준에 맞게 3단계로 분리했습니다"
        subcopy="결제 → 배송지 묶음, 결제 → 개별 상품 두 가지 2단계 구조를 먼저 검토했지만 각각 부분 출고·정산 기준에서 막혔습니다. 그래서 결제(ORD) · 배송비·정산(GRP) · 발주·클레임(ITM) 3단계로 나누었습니다."
        footer="주문번호 생성 기준을 3단계로 잡아, 1P/3P가 섞인 주문의 출고·배송비·정산이 엉키지 않도록 맞물리게 했습니다."
      >
        <OrderTierStructure />
      </Tile>
    </div>
  );
}
