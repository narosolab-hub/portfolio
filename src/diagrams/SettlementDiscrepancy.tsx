import "./SettlementDiscrepancy.css";

const PRINCIPLES = [
  {
    label: "정산 산정 기준",
    what: "주문 내역과 정산 내역이 같은 금액 기준을 참조해야 함",
    howTo: "실구매가(할인 반영) 기준으로 통일해 두 화면이 동일 필드를 참조하도록 수정",
  },
  {
    label: "부분반품 마이너스 라인",
    what: "반품·취소 발생 시 기존 정산을 덮어쓰지 않고 차감 라인으로 남김",
    howTo: "원주문 건에 마이너스 금액을 가진 정산 라인을 신규로 추가하는 구조로 반영",
  },
  {
    label: "상태 분리",
    what: "결제완료, 구매확정, 취소, 반품, 정산완료 상태를 분리",
    howTo: "주문 상태(구매확정)와 정산 상태(정산예정/정산완료)를 별개 값으로 관리하고 Admin 액션으로만 전이",
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
      <p className="discrepancy-viz__tag text-tagline">정산 4원칙</p>

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
