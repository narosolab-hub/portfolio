import "./OrderTierStructure.css";

const rejected = [
  {
    title: "결제 → 배송지 묶음",
    steps: ["결제", "배송지 묶음"],
    blockedAt: "묶음 안 개별 상품 부분 출고·취소 불가",
  },
  {
    title: "결제 → 개별 상품",
    steps: ["결제", "개별 상품"],
    blockedAt: "출고지·묶음배송 기준 배송비·정산 계산 불가",
  },
];

const legend = [
  { code: "ORD", meaning: "원결제번호 · PG 결제 기준 · 국세청 세무 신고 단위" },
  { code: "GRP", meaning: "배송비·정산 단위 (공급사·배송지·출고지·묶음배송 여부로 분리)" },
  { code: "ITM", meaning: "발주 · 부분 출고 · 부분 취소 · 클레임 단위" },
];

const groups = [
  {
    id: "GRP ①",
    rule: "공급사A + 배송지1 · 배송비 1회 부과",
    items: ["ITM 상품 A ×3", "ITM 상품 B ×1"],
  },
  {
    id: "GRP ②",
    rule: "공급사A + 배송지2",
    items: ["ITM 상품 A ×2"],
  },
  {
    id: "GRP ③",
    rule: "공급사B + 배송지1 + 출고지2 · 묶음배송 불가 → 배송비 별도",
    items: ["ITM 상품 C ×5", "ITM 상품 D ×1"],
  },
];

export default function OrderTierStructure() {
  return (
    <div className="tier-viz">
      <div className="tier-viz__rejected">
        {rejected.map((r) => (
          <div className="tier-viz__reject-card" key={r.title}>
            <p className="tier-viz__reject-title text-caption-strong">
              <span className="pill pill--muted-on-light">검토안</span> {r.title}
            </p>
            <div className="tier-viz__reject-steps">
              {r.steps.map((s) => (
                <span className="tier-viz__reject-step" key={s}>
                  {s}
                </span>
              ))}
            </div>
            <p className="tier-viz__blocked">✕ {r.blockedAt}</p>
          </div>
        ))}
      </div>

      <div className="tier-viz__connector">
        <span>2단계로는 편의·부분처리·정산을 동시에 못 맞춤</span>
        <span className="tier-viz__connector-arrow">↓</span>
      </div>

      <div className="tier-viz__accepted">
        <p className="tier-viz__accept-title text-caption-strong">
          <span className="pill pill--primary">채택</span> ORD → GRP → ITM 3단계
        </p>

        <table className="tier-viz__def-table">
          <thead>
            <tr>
              <th>단위</th>
              <th>의미</th>
            </tr>
          </thead>
          <tbody>
            {legend.map((l) => (
              <tr key={l.code}>
                <td>{l.code}</td>
                <td>{l.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="tier-viz__example">
          <p className="tier-viz__example-lede text-caption">
            예시 — 원결제번호(ORD) 1건이 배송그룹(GRP)과 상품(ITM)으로 분해되는 방식
          </p>

          <div className="tier-viz__tree">
            <div className="tier-viz__node tier-viz__node--ord">
              <strong>ORD · 결제번호</strong>
              <span>1건</span>
            </div>
            <div className="tier-viz__branch-line" />
            <div className="tier-viz__grp-row">
              {groups.map((g) => (
                <div className="tier-viz__grp-branch" key={g.id}>
                  <div className="tier-viz__node tier-viz__node--grp">
                    <strong>{g.id}</strong>
                    <span>{g.rule}</span>
                  </div>
                  <div
                    className={`tier-viz__itm-row${
                      g.items.length > 1 ? " tier-viz__itm-row--fork" : ""
                    }`}
                  >
                    {g.items.map((label) => (
                      <div className="tier-viz__node tier-viz__node--itm" key={label}>
                        <strong>{label}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="tier-viz__tree-caption text-caption">
          결제번호(ORD) <strong>1건</strong> 안에 <strong>여러 배송그룹(GRP)</strong>이 나뉘고 각
          배송그룹 안에 <strong>상품 단위(ITM)</strong>가 발주·출고·취소 기준으로 묶입니다
        </p>
      </div>
    </div>
  );
}
