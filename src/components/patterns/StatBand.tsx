import "./StatBand.css";

export default function StatBand({
  stats,
  dark = false,
}: {
  stats: { value: string; label: string }[];
  dark?: boolean;
}) {
  return (
    <div className={`stat-band${dark ? " stat-band--dark" : ""}`}>
      {stats.map((s) => (
        <div className="stat-band__item" key={s.label}>
          <span className="stat-band__value">{s.value}</span>
          <span className="stat-band__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
