import { Fragment } from "react";
import "./PolicySplitCompare.css";

const columns = [
  {
    key: "1p",
    label: "1P 자사 상품 · 직접판매",
    badge: "후불 유지",
    rows: [
      { k: "판매 주체", v: "자사" },
      { k: "결제 방식", v: "승인 회원만 후불결제 유지 · 그외 PG 선결제" },
      { k: "정산 대상", v: "자사 매출" },
      { k: "정책 예외", v: "회원 등급별 자사 상품 할인 · 수수료 0%" },
    ],
    note: "기존 핵심 거래처(구매자)의 후불결제 구매 흐름은 유지하되, 적용 범위는 자사 상품으로 제한",
  },
  {
    key: "3p",
    label: "3P 입점사 상품 · 중개판매",
    badge: "PG 결제 필수",
    rows: [
      { k: "판매 주체", v: "공급사" },
      { k: "결제 방식", v: "PG 결제 필수" },
      { k: "정산 대상", v: "수수료 제외 공급사 정산" },
      { k: "자사 역할", v: "중개 및 수수료 관리" },
    ],
    note: "3P 판매대금이 자사 계좌를 직접 거치지 않도록 결제 및 지급 대행 구조로 분리",
  },
];

const conflicts = [
  {
    who: "대표 / 거래처",
    wants: [
      { label: "대표", lines: ["불확실한 외상 거래를 줄이되 PG 수수료 최소화"] },
      { label: "거래처", lines: ["상품마다 무통장입금으로 결제하는 번거로움 최소화"] },
    ],
    decision: "선불 결제 구조는 필요했지만 모든 거래를 하나의 선불 구조로 통일하기는 어려웠음",
  },
  {
    who: "운영팀 / 재무팀",
    wants: [
      { label: "운영팀", lines: ["기존 거래 규모 유지 및 사이트 이전에 대한 거래처 반발 최소화"] },
      { label: "재무팀", lines: ["매월 반복되는 수기 정산 관리 간편화"] },
    ],
    decision: "후불결제를 없애기보다 자사 상품에 한정해 통제 가능한 방식으로 유지해야 했음",
  },
  {
    who: "법적 리스크",
    wants: [
      {
        label: null,
        lines: [
          "통신판매업+통신판매중개업 구조에서 입점 상품의 결제대금을 자사 계좌로 직접 수취할 경우 전자금융거래법 위반 소지와 정산 리스크 발생",
        ],
      },
    ],
    decision: "입점 상품 거래 구조는 PG사를 통해 결제대행과 지급대행 구조로 분리해야 했음",
  },
];

export default function PolicySplitCompare() {
  return (
    <div className="policy-split-wrap">
      <p className="policy-split__tag text-tagline">이해관계자 요구사항 충돌</p>

      <table className="policy-split__conflict-table">
        <colgroup>
          <col style={{ width: "16%" }} />
          <col style={{ width: "53%" }} />
          <col style={{ width: "31%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>이해관계자</th>
            <th>요구사항</th>
            <th>설계로 이어진 판단</th>
          </tr>
        </thead>
        <tbody>
          {conflicts.map((c) => (
            <tr key={c.who}>
              <td>{c.who}</td>
              <td>
                {c.wants.map((w, i) => (
                  <div
                    className={`policy-split__want-row${
                      w.label ? "" : " policy-split__want-row--no-label"
                    }`}
                    key={i}
                  >
                    {w.label && (
                      <span className="policy-split__want-label">
                        <span className="pill pill--muted-on-light">{w.label}</span>
                      </span>
                    )}
                    <span>
                      {w.lines.map((line, j) => (
                        <Fragment key={j}>
                          {j > 0 && <br />}
                          {line}
                        </Fragment>
                      ))}
                    </span>
                  </div>
                ))}
              </td>
              <td>{c.decision}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="policy-split__tag text-tagline">거래 유형에 따라 결제·정산 기준 분리</p>
      <div className="policy-split">
        {columns.map((col) => (
          <div className={`policy-split__card policy-split__card--${col.key}`} key={col.key}>
            <div className="policy-split__header">
              <span className="policy-split__title text-body-strong">{col.label}</span>
              <span className="policy-split__badge">{col.badge}</span>
            </div>
            <div className="policy-split__rows">
              {col.rows.map((r) => (
                <div className="policy-split__row" key={r.k}>
                  <span className="policy-split__row-key text-caption">{r.k}</span>
                  <span className="policy-split__row-value text-caption-strong">{r.v}</span>
                </div>
              ))}
            </div>
            {col.note && <p className="policy-split__note text-caption">{col.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
