import "./ExpansionTimeline.css";

// 회원가입~정산까지 5개 플로우에서 1P → 3P 전환 포인트를 한눈에.
// 세로 타임라인은 3P 설명이 길어 지나치게 길어져, 각 플로우를 가로 카드로
// 나열하고 핵심만 짧게 담는다(1P 현재 → 3P 확장 시 새로 잡아야 한 것).
const stages = [
  {
    no: "01",
    title: "가입 · 입점",
    before: "구매 회원만 존재하며, 판매 주체 역시 자사로 단일",
    after: "구매 회원 가입 + 공급사 입점까지 양방향 온보딩 프로세스 설계 필요",
  },
  {
    no: "02",
    title: "상품",
    before: "자사가 등록하면 곧 판매라 별도 승인 개념 없음",
    after: "등록 → 승인 → 노출 검수 프로세스와 판매 가능 기준 신설 필요",
  },
  {
    no: "03",
    title: "주문 · 결제",
    before: "자사 상품 단일 판매라 주문 · 결제 흐름이 단순",
    after: "다중 공급사 · 다중 배송지 주문 구조와 결제 · 자금 흐름 분리 필요",
  },
  {
    no: "04",
    title: "배송 · 클레임",
    before: "자사가 직접 출고 · CS를 맡아 책임 소재가 단순",
    after: "공급사별 발주 · 출고와 부분 취소 · 클레임 처리 흐름 정의 필요",
  },
  {
    no: "05",
    title: "정산",
    before: "자사 매출로 마감되어 별도 정산 개념 없음",
    after: "공급사별 정산 산정 · 중개 수수료 구분 · 세무 증빙 기준 수립 필요",
  },
];

export default function ExpansionTimeline() {
  return (
    <div className="exp-scope-wrap">
      <p className="exp-scope__lead text-body">
        자사 직접 판매와 공급사 입점 판매가 한 플랫폼에서 함께 운영되며, 판매·책임 주체가
        달라지는 문제를 해결해야 했습니다. 그래서 회원가입부터 정산까지 커머스 전 영역을
        주체 기준으로 1P에서 3P로 다시 설계했습니다.
      </p>
      <p className="exp-scope__tag text-tagline">플로우별 1P → 3P 확장 포인트</p>
      <div className="exp-scope-grid">
        {stages.map((s) => (
          <div className="exp-scope-card" key={s.no}>
            <span className="exp-scope-card__no">{s.no}</span>
            <p className="exp-scope-card__title text-body-strong">{s.title}</p>
            <div className="exp-scope-card__state exp-scope-card__state--before">
              <span className="exp-scope-card__label">1P</span>
              <span className="exp-scope-card__text">{s.before}</span>
            </div>
            <div className="exp-scope-card__state exp-scope-card__state--after">
              <span className="exp-scope-card__label">3P 확장</span>
              <span className="exp-scope-card__text">{s.after}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
