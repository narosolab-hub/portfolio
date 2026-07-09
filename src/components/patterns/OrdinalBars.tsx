import "./OrdinalBars.css";

export default function OrdinalBars({
  items,
  dark = false,
  vertical = false,
}: {
  items: { label: string; count: number }[];
  dark?: boolean;
  vertical?: boolean;
}) {
  const max = Math.max(...items.map((i) => i.count));

  if (vertical) {
    return (
      <div className={`obars obars--vertical${dark ? " obars--dark" : ""}`}>
        {items.map((item, i) => {
          const opacity = 1 - (i / items.length) * 0.55;
          return (
            <div className="obars__col" key={item.label}>
              <span className="obars__count">{item.count}</span>
              <div className="obars__col-track">
                <div
                  className="obars__fill"
                  style={{ height: `${(item.count / max) * 100}%`, opacity }}
                />
              </div>
              <span className="obars__label">{item.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`obars${dark ? " obars--dark" : ""}`}>
      {items.map((item, i) => {
        const opacity = 1 - (i / items.length) * 0.55;
        return (
          <div className="obars__row" key={item.label}>
            <span className="obars__label">{item.label}</span>
            <div className="obars__track">
              <div
                className="obars__fill"
                style={{ width: `${(item.count / max) * 100}%`, opacity }}
              />
            </div>
            <span className="obars__count">{item.count}</span>
          </div>
        );
      })}
    </div>
  );
}
