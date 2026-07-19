import { NavLink, useParams } from "react-router-dom";
import "./GlobalNav.css";

// 각 링크의 경로 꼬리표. 현재 공고(slug)가 있으면 앞에 /<slug>가 붙어
// 공고 컨텍스트를 유지한 채 탭을 오갑니다. (Overview는 꼬리표 없음)
const links = [
  { path: "", label: "Overview" },
  { path: "/b2b-platform", label: "B2B Platform" },
  { path: "/sub-projects", label: "Sub Projects" },
];

export default function GlobalNav() {
  // /<slug>, /<slug>/b2b-platform 등에서 현재 공고 slug를 읽어옵니다.
  // 기본 경로(/, /b2b-platform …)에서는 undefined → 접두어 없음.
  const { slug } = useParams();
  const base = slug ? `/${slug}` : "";

  return (
    <nav className="global-nav">
      {links.map((l) => {
        const to = `${base}${l.path}` || "/";
        return (
          <NavLink
            key={l.path}
            to={to}
            end={l.path === ""}
            className={({ isActive }) =>
              "global-nav__link" +
              (isActive ? " global-nav__link--current" : "")
            }
          >
            {l.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
