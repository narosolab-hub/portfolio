import "./PaymentSplitFlow.css";

type Split = {
  label: string;
  value: string;
  type: "revenue" | "payout";
  note?: string;
};

const columns: {
  key: string;
  label: string;
  badge: string;
  step: string;
  splits: (Split | null)[];
}[] = [
  {
    key: "1p",
    label: "1P · 자사 상품",
    badge: "수수료 0%",
    step: "결제대금",
    splits: [
      null,
      { label: "자사 매출", value: "결제대금 전액", type: "revenue" },
    ],
  },
  {
    key: "3p",
    label: "3P · 공급사 상품",
    badge: "PG 지급대행 필수",
    step: "결제대금",
    splits: [
      {
        label: "공급사 지급",
        value: "정산대금 (수수료 제외)",
        type: "payout",
        note: "PG 지급대행 · 자사 계좌 미경유",
      },
      { label: "자사 매출", value: "수수료만", type: "revenue" },
    ],
  },
];

const reviewItems = [
  "PG 매출 신고 — 1P 매출·3P 정산대금·수수료 구분 자료 필요",
  "공급사 정산대금 — 수수료 제외 금액 정산 기준",
  "자사 수수료 — 별도 매출 항목으로 분리",
  "후불결제포인트 — 1P 상품 전용으로 제한",
  "세금계산서·증빙 — 발행 방식 별도 검토",
  "재무팀 운영 경험 — 중개 판매 정산 첫 사례",
];

export default function PaymentSplitFlow() {
  return (
    <div className="pay-split">
      <p className="pay-split__tag text-tagline">정산 및 자금 흐름</p>
      <div className="pay-split__root">
        <strong>고객 결제 (PG)</strong>
        <span>결제대금은 PG를 통해 자사 명의로 국세청에 일괄 매출 신고</span>
      </div>
      <div className="pay-split__branch-line" />
      <div className="pay-split__cols">
        {columns.map((col) => (
          <div className="pay-split__col" key={col.key}>
            <div className="pay-split__col-head">
              <span className="pay-split__col-label">{col.label}</span>
              <span className="pay-split__col-badge">{col.badge}</span>
            </div>
            <div className="pay-split__step">{col.step}</div>
            <span className="pay-split__connector">↓</span>
            <div className="pay-split__splits">
              {col.splits.map((s, i) =>
                s === null ? (
                  <div
                    className="pay-split__split-item pay-split__split-item--placeholder"
                    aria-hidden="true"
                    key={`ph-${i}`}
                  >
                    <span className="pay-split__split-label">공급사 지급</span>
                    <span className="pay-split__split-value">정산대금 (수수료 제외)</span>
                    <span className="pay-split__split-note">PG 지급대행 · 자사 계좌 미경유</span>
                  </div>
                ) : (
                  <div
                    className={`pay-split__split-item pay-split__split-item--${s.type}`}
                    key={s.label}
                  >
                    <span className="pay-split__split-label">{s.label}</span>
                    <span className="pay-split__split-value">{s.value}</span>
                    {s.note && <span className="pay-split__split-note">{s.note}</span>}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <svg
        className="pay-split__merge-svg"
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M25,0 L25,16 L50,16 L50,32" vectorEffect="non-scaling-stroke" />
        <path d="M75,0 L75,16 L50,16 L50,32" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="pay-split__final">
        <strong>자사 계좌</strong>
        <span>PG 결제대금 중 공급사에 지급한 정산금 제외 금액 자사 계좌로 수취</span>
      </div>
      <p className="pay-split__footer text-caption">
        PG 신고 명의는 자사 단일 사업자로 일괄 처리되지만,
        <br />
        실제 자사 매출은 <strong>수수료뿐</strong>이며 나머지 정산대금은 지급대행을 통해{" "}
        <strong>공급사에게 직접</strong> 전달됩니다.
      </p>
      <div className="pay-split__review">
        <span className="pay-split__review-label text-caption-strong">
          재무팀과 협의 진행 내용
        </span>
        <ul className="pay-split__review-list">
          {reviewItems.map((item) => (
            <li className="pay-split__review-item text-caption" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
