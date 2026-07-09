import { NavLink } from "react-router-dom";
import "./GlobalNav.css";

const links = [
  { to: "/", label: "Overview" },
  { to: "/b2b-platform", label: "B2B Platform" },
  { to: "/sub-projects", label: "Sub Projects" },
];

export default function GlobalNav() {
  return (
    <nav className="global-nav">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.to === "/"}
          className={({ isActive }) =>
            "global-nav__link" + (isActive ? " global-nav__link--current" : "")
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}
