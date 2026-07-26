import "./SettlementDiscrepancy.css";

const PRINCIPLES = [
  {
    label: "정산 산정 기준",
    what: "주문-정산 내역 간 참조 금액 불일치 방지",
    howTo: "실구매가(할인 반영) 기준으로 공통 필드 참조 로직 구현",
  },
  {
    label: "상태 분리",
    what: "주문 상태와 정산 상태의 분리",
    howTo: "주문 상태(구매확정)와 정산 상태(정산예정/완료)를 분리하고 Admin 액션 기반의 전이 구조 설계",
  },
  {
    label: "원 단위 절사",
    what: "공급사 정산금과 플랫폼 수수료 계산 시 반올림/절사 기준 통일",
    howTo: "수수료 계산 시 원 단위 미만은 절사 후 정수로 적재",
  },
];

export default function SettlementDiscrepancy() {
  return (
    <div className="discrepancy-viz">
      <p className="discrepancy-viz__tag text-tagline">정산 3원칙</p>

      <div className="discrepancy-viz__principles-table-wrap">
        <table className="discrepancy-viz__principles-table">
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "34%" }} />
            <col style={{ width: "46%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>정산 원칙</th>
              <th>What</th>
              <th>How to</th>
            </tr>
          </thead>
          <tbody>
            {PRINCIPLES.map((row) => (
              <tr key={row.label}>
                <td className="discrepancy-viz__principles-label">{row.label}</td>
                <td>{row.what}</td>
                <td>{row.howTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
