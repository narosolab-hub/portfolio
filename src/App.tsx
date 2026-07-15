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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/b2b-platform" element={<B2BProject />} />
      <Route path="/sub-projects" element={<SubProjects />} />
      <Route path="/:slug" element={<VariantHome />} />
    </Routes>
  );
}

export default App;
