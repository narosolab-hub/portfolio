import "./E2EVerificationFlow.css";

const steps = [
  { step: "회원가입/입점", risk: "권한, 승인 상태" },
  { step: "상품 등록", risk: "공급사별 상품 등록 기준" },
  { step: "주문/결제", risk: "1P/3P 혼합 주문, 후불결제 제한" },
  { step: "발주/출고", risk: "공급사별 발주, 부분 출고" },
  { step: "정산/세무", risk: "정산 산정 기준, 매출 구분" },
  { step: "클레임", risk: "부분 취소, 교환/반품 상태값" },
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
            <col style={{ width: "34%" }} />
            <col style={{ width: "66%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>단계</th>
              <th>확인한 리스크</th>
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
