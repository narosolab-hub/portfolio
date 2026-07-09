import "./ComparisonTable.css";

export type ComparisonRow = {
  aspect: string;
  before: string;
  reason?: string;
  after: string;
};

export default function ComparisonTable({
  rows,
  dark = false,
}: {
  rows: ComparisonRow[];
  dark?: boolean;
}) {
  const hasReason = rows.some((r) => r.reason);
  return (
    <table className={`ctable${dark ? " ctable--dark" : ""}`}>
      <colgroup>
        {hasReason ? (
          <>
            <col style={{ width: "16%" }} />
            <col style={{ width: "28%" }} />
            <col style={{ width: "28%" }} />
            <col style={{ width: "28%" }} />
          </>
        ) : (
          <>
            <col style={{ width: "22%" }} />
            <col style={{ width: "39%" }} />
            <col style={{ width: "39%" }} />
          </>
        )}
      </colgroup>
      <thead>
        <tr>
          <th>관점</th>
          <th>Before</th>
          {hasReason && <th>전환 사유</th>}
          <th>After</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.aspect}>
            <td>{r.aspect}</td>
            <td>{r.before}</td>
            {hasReason && <td>{r.reason}</td>}
            <td className="ctable__after">{r.after}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
