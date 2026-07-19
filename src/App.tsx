import { Routes, Route, useParams, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import B2BProject from "./pages/B2BProject";
import SubProjects from "./pages/SubProjects";
import { VARIANTS } from "./variants";

// 공고별 버전: /<slug> — VARIANTS에 등록된 slug만 열리고,
// 없는 slug는 기본 페이지로 돌려보냅니다.
function VariantHome() {
  const { slug } = useParams();
  const variant = slug ? VARIANTS[slug] : undefined;
  if (!variant) return <Navigate to="/" replace />;
  return <Home variant={variant} />;
}

// 공고 컨텍스트를 유지한 채 여는 하위 페이지(B2B·Sub).
// 페이지 내용 자체는 기본과 동일하지만, URL에 slug가 남아 있어야
// GlobalNav가 "Overview"를 다시 그 공고(/<slug>)로 돌려보낼 수 있습니다.
// 등록되지 않은 slug면 공고 컨텍스트 없는 기본 경로로 돌려보냅니다.
function VariantB2B() {
  const { slug } = useParams();
  if (!slug || !VARIANTS[slug]) return <Navigate to="/b2b-platform" replace />;
  return <B2BProject />;
}

function VariantSub() {
  const { slug } = useParams();
  if (!slug || !VARIANTS[slug]) return <Navigate to="/sub-projects" replace />;
  return <SubProjects />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/b2b-platform" element={<B2BProject />} />
      <Route path="/sub-projects" element={<SubProjects />} />
      <Route path="/:slug" element={<VariantHome />} />
      <Route path="/:slug/b2b-platform" element={<VariantB2B />} />
      <Route path="/:slug/sub-projects" element={<VariantSub />} />
    </Routes>
  );
}

export default App;
