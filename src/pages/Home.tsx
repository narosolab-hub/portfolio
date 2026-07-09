import { Link } from "react-router-dom";
import GlobalNav from "../components/GlobalNav";
import Tile from "../components/Tile";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <GlobalNav />

      <Tile variant="light">
        <p className="tile__eyebrow text-caption-strong">PRODUCT MANAGER PORTFOLIO</p>
        <h1 className="text-section-heading" style={{ maxWidth: 640 }}>
          [이름 / 한 줄 소개 — 자리표시자 채워주세요]
        </h1>
        <p className="text-body" style={{ color: "var(--color-ink-muted-80)", maxWidth: 640 }}>
          1P 자사몰을 3P 입점형 플랫폼으로 전환하며 회원·상품·주문·결제·정산 전 사이클의 운영
          기준을 처음부터 설계한 프로젝트를 중심으로 PM으로서의 문제 정의와 의사결정 과정을
          정리했습니다.
        </p>
      </Tile>

      <Tile variant="parchment" eyebrow="PROJECTS" title="프로젝트">
        <div className="home-links">
          <Link className="home-links__card" to="/b2b-platform">
            <span className="home-links__eyebrow text-caption-strong">CASE STUDY 01</span>
            <span className="text-tagline">B2B몰 1P → 3P 플랫폼 전환</span>
            <span className="text-caption" style={{ color: "var(--color-ink-muted-48)" }}>
              회원·상품·주문·결제·정산 전 사이클 재설계 · 8개 섹션
            </span>
            <span className="home-links__cta text-caption-strong">자세히 보기 →</span>
          </Link>
          <Link className="home-links__card" to="/sub-projects">
            <span className="home-links__eyebrow text-caption-strong">CASE STUDY 02–04</span>
            <span className="text-tagline">서브 프로젝트 3건</span>
            <span className="text-caption" style={{ color: "var(--color-ink-muted-48)" }}>
              바코드 매칭 자동화 · 라이브커머스 · 복지플랫폼 마이페이지
            </span>
            <span className="home-links__cta text-caption-strong">자세히 보기 →</span>
          </Link>
        </div>
      </Tile>
    </div>
  );
}
