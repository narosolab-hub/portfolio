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
  className,
}: {
  variant?: "light" | "parchment" | "dark";
  eyebrow?: string;
  title?: string;
  // subcopy·footer·role은 문자열도 되고, 핵심어에 <strong> 볼드를 주기 위해
  // JSX(ReactNode)도 받습니다. 기존 문자열 사용처는 그대로 동작합니다.
  subcopy?: ReactNode;
  role?: ReactNode[];
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`tile tile--${variant}${className ? ` ${className}` : ""}`}>
      <div className="tile__inner">
        {eyebrow && <p className="tile__eyebrow text-caption-strong">{eyebrow}</p>}
        {title && <h2 className="text-section-heading">{title}</h2>}
        {subcopy && <p className="tile__subcopy text-body">{subcopy}</p>}
        {children && <div className="tile__content">{children}</div>}
        {footer && <p className="tile__footer text-body-strong">{footer}</p>}
        {role && role.length > 0 && (
          <ul className="tile__role text-caption">
            {role.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
