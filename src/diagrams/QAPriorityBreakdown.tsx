import type { ReactNode } from "react";
import "./QAPriorityBreakdown.css";

export type QAPriorityItem = {
  label: string;
  count: number;
  description: string;
};

export type QAPhaseRow = {
  phase: string;
  criteria: string;
  example: string;
};

export type QAStrategyRow = {
  severity: string;
  criteria: string;
  action: string;
};

export default function QAPriorityBreakdown({
  title,
  items,
  strategyRows,
  phaseIntro,
  phaseRows,
}: {
  title: string;
  items: QAPriorityItem[];
  strategyRows?: QAStrategyRow[];
  phaseIntro?: ReactNode;
  phaseRows?: QAPhaseRow[];
}) {
  const max = Math.max(...items.map((i) => i.count));

  return (
    <div className="qa-priority">
      <p className="qa-priority__tag text-tagline">{title}</p>

      <div className="qa-priority__body">
        <div className="qa-priority__chart">
          {items.map((item, i) => {
            const opacity = 1 - (i / items.length) * 0.55;
            return (
              <div className="qa-priority__bar" key={item.label}>
                <span className="qa-priority__bar-count">{item.count}</span>
                <div className="qa-priority__bar-track">
                  <div
                    className="qa-priority__bar-fill"
                    style={{ height: `${(item.count / max) * 100}%`, opacity }}
                  />
                </div>
                <span className="qa-priority__bar-label">{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="qa-priority__table-wrap">
          <table className="qa-priority__table">
            {strategyRows ? (
              <>
                <thead>
                  <tr>
                    <th className="qa-priority__table-label">심각도</th>
                    <th>판단 기준</th>
                    <th>대응 전략</th>
                  </tr>
                </thead>
                <tbody>
                  {strategyRows.map((row) => (
                    <tr key={row.severity}>
                      <td className="qa-priority__table-label">{row.severity}</td>
                      <td>{row.criteria}</td>
                      <td>{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <tbody>
                {items.map((item) => (
                  <tr key={item.label}>
                    <td className="qa-priority__table-label">{item.label}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {(phaseIntro || phaseRows) && (
        <div className="qa-priority__phase">
          {phaseIntro && <div className="qa-priority__phase-intro text-body">{phaseIntro}</div>}
          {phaseRows && (
            <div className="qa-priority__phase-table-wrap">
              <table className="qa-priority__phase-table">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "50%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>배포 단계 (Phase)</th>
                    <th>오픈 요건 (목표)</th>
                    <th>주요 범위 (상세 내역)</th>
                  </tr>
                </thead>
                <tbody>
                  {phaseRows.map((row) => (
                    <tr key={row.phase}>
                      <td className="qa-priority__phase-label">{row.phase}</td>
                      <td>{row.criteria}</td>
                      <td>{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
