import "./Tile.css";
import type { ReactNode } from "react";

export default function Tile({
  variant = "light",
  eyebrow,
  title,
  subcopy,
  role,
  footer,
  children,
}: {
  variant?: "light" | "parchment" | "dark";
  eyebrow?: string;
  title?: string;
  subcopy?: string;
  role?: string[];
  footer?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`tile tile--${variant}`}>
      <div className="tile__inner">
        {eyebrow && <p className="tile__eyebrow text-caption-strong">{eyebrow}</p>}
        {title && <h2 className="text-section-heading">{title}</h2>}
        {subcopy && <p className="tile__subcopy text-body">{subcopy}</p>}
        {children && <div className="tile__content">{children}</div>}
        {footer && <p className="tile__footer text-body-strong">{footer}</p>}
        {role && role.length > 0 && (
          <ul className="tile__role text-caption">
            {role.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
