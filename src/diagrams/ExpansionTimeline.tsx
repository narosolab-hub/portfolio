import { Fragment } from "react";
import "./ExpansionTimeline.css";

function renderBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>
  );
}

const stages = [
  {
    title: "회원가입 · 공급사 입점",
    before: "구매 회원 가입만 존재 (판매 주체는 자사 하나)",
    after:
      "'공급사'라는 판매 주체가 새로 생겨 **구매 회원 가입과 공급사 입점이라는 양방향 온보딩 프로세스**를 각각 설계해야 했습니다. (공급사 심사·계약, 계좌·정산 정보 등록, 자사를 공급사로 볼 것인가까지)",
  },
  {
    title: "상품",
    before: "자사가 등록하면 곧 판매라 승인 개념 불필요",
    after:
      "외부 공급사가 올린 상품을 그대로 노출시킬 수 없어 **상품 등록 → 관리자 승인 → 정상 노출**로 이어지는 검수·노출 프로세스와 판매 가능 기준(상품정보제공고시·KC인증 등)을 잡아야 했습니다.",
  },
  {
    title: "주문 · 결제",
    before: "자사 상품 단일 판매라 주문·결제 흐름 단순",
    after:
      "한 주문에 여러 공급사 상품이 섞이고 결제 주체(판매자 vs 중개자)가 갈려, **다중 공급사·다중 배송지를 담는 주문 구조**와 1P·3P를 나누는 **결제·자금 흐름 기준**을 새로 세워야 했습니다.",
  },
  {
    title: "배송 · 클레임",
    before: "자사가 직접 출고·CS를 담당하여 책임 소재 단순",
    after:
      "실제 출고·교환·반품 주체가 공급사로 넘어가 **공급사별 발주·출고**와 **부분 취소·클레임의 책임·처리 흐름**을 새로 정의해야 했습니다.",
  },
  {
    title: "정산",
    before: "자사 매출로 끝나 별도 정산 개념이 없음",
    after:
      "공급사에게 판매대금을 되돌려주는 구조가 새로 생겨 **공급사별 정산 산정 기준·중개 수수료 구분·세무 증빙**까지 정산 기준을 잡아야 했습니다.",
  },
];

export default function ExpansionTimeline() {
  return (
    <div className="exp-timeline-wrap">
      <p className="exp-timeline__tag text-tagline">플로우별 1P → 3P 확장 포인트</p>
      <div className="exp-timeline">
      {stages.map((stage, i) => (
        <div className="exp-timeline__stage" key={stage.title}>
          <div className="exp-timeline__dot">{i + 1}</div>
          <p className="exp-timeline__title text-body-strong">{stage.title}</p>
          <div className="exp-timeline__rows">
            <div className="exp-timeline__row exp-timeline__row--before">
              <span className="exp-timeline__row-label">1P</span>
              <span className="exp-timeline__row-text text-body">{stage.before}</span>
            </div>
            <div className="exp-timeline__row exp-timeline__row--after">
              <span className="exp-timeline__row-label">3P 확장</span>
              <span className="exp-timeline__row-text text-body">{renderBold(stage.after)}</span>
            </div>
          </div>
        </div>
      ))}

      <p className="exp-timeline__closing text-body-strong">
        본 프로젝트는 회원가입부터 정산까지 커머스 전 영역에서 1P 구조를 3P 기준으로 다시 짜야 하는 프로젝트였습니다.
      </p>
      </div>
    </div>
  );
}
