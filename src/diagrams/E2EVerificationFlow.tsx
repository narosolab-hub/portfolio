import "./E2EVerificationFlow.css";

const steps = [
  {
    step: "회원가입/입점",
    risk: "1P/3P 주체별 권한 분리 및 승인 상태에 따른 어드민 기능 제한 검증",
  },
  {
    step: "상품 등록",
    risk: "3P 상품 검수·승인 프로세스 및 1P/3P 상품 혼합 노출 정책 정합성 검증",
  },
  {
    step: "주문/결제",
    risk: "1P/3P 혼합 장바구니 일괄 결제 시 주문 자동 분할 로직 검증",
  },
  {
    step: "발주/출고",
    risk: "공급사별 발주 내역 개별 노출 및 부분 출고 시 배송비 산정 로직 검증",
  },
  {
    step: "클레임",
    risk: "복합 클레임(부분 취소·반품) 시나리오별 상태값 전이 및 환불 정합성 검증",
  },
  {
    step: "정산/세무",
    risk: "수수료·할인 정책에 따른 최종 정산금 산출 및 주체별 매출 증빙 분리 검증",
  },
];

export default function E2EVerificationFlow() {
  return (
    <div className="e2e-flow">
      <p className="e2e-flow__tag text-tagline">E2E 검증 흐름</p>
      <div className="e2e-flow__body">
        <div className="e2e-flow__steps">
          {steps.map((s, i) => (
            <div className="e2e-flow__step-wrap" key={s.step}>
              <div className="e2e-flow__step">
                <span className="e2e-flow__step-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="e2e-flow__step-label">{s.step}</span>
              </div>
              {i < steps.length - 1 && <span className="e2e-flow__connector">↓</span>}
            </div>
          ))}
        </div>

        <table className="e2e-flow__table">
          <colgroup>
            <col style={{ width: "18%" }} />
            <col style={{ width: "82%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>단계</th>
              <th>핵심 검증 포인트</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s) => (
              <tr key={s.step}>
                <td>{s.step}</td>
                <td>{s.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
