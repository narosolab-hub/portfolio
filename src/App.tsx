import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import B2BProject from "./pages/B2BProject";
import SubProjects from "./pages/SubProjects";
import {
  VARIANT_LOADERS,
  VARIANT_FAVICONS,
  isVariantSlug,
  type Variant,
} from "./variants";

const DEFAULT_FAVICON = "/favicon.svg";

// 현재 URL 첫 세그먼트(/<slug>/...)로 공고를 찾아, 그 공고 전용 파비콘이
// 지정돼 있으면 브라우저 탭 아이콘을 실시간으로 교체합니다. 공고가 아니거나
// favicon이 없으면 기본 파비콘으로 되돌립니다. /<slug> 하위 탭(b2b-platform·
// sub-projects)에서도 첫 세그먼트가 같으므로 공고 파비콘이 유지됩니다.
// 파비콘 경로는 메인 번들의 동기 맵(VARIANT_FAVICONS)에 있어 깜빡임 없이 즉시
// 반영됩니다(공고 데이터 청크 로드를 기다리지 않음).
function useRouteFavicon() {
  const { pathname } = useLocation();
  const firstSegment = pathname.split("/")[1] ?? "";
  const href = VARIANT_FAVICONS[firstSegment] ?? DEFAULT_FAVICON;

  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
    // SVG는 type을 명시하고, png 등 그 외 형식은 브라우저가 판단하도록 비움
    if (href.endsWith(".svg")) link.setAttribute("type", "image/svg+xml");
    else link.removeAttribute("type");
  }, [href]);
}

// 공고별 버전: /<slug> — VARIANT_LOADERS에 등록된 slug만 열립니다.
// 등록된 slug면 해당 공고 데이터 청크를 동적 import로 불러와 Home에 넘기고,
// 없는 slug는 기본 페이지로 돌려보냅니다. (다른 공고 데이터는 이 시점에
// 로드되지 않으므로 같은 번들에 노출되지 않습니다.)
function VariantHome() {
  const { slug = "" } = useParams();
  const loader = VARIANT_LOADERS[slug];
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (!loader) return;
    let cancelled = false;
    setVariant(null);
    loader().then((mod) => {
      if (!cancelled) setVariant(mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, [loader]);

  if (!loader) return <Navigate to="/" replace />;
  // 청크 도착 전(아주 짧은 순간)에는 아무것도 그리지 않습니다.
  if (!variant) return null;
  return <Home variant={variant} />;
}

// 공고 컨텍스트를 유지한 채 여는 하위 페이지(B2B·Sub).
// 페이지 내용 자체는 기본과 동일하므로 공고 데이터를 로드할 필요 없이,
// slug가 유효한지만 즉시 확인합니다. URL에 slug가 남아 있어야 GlobalNav가
// "Overview"를 다시 그 공고(/<slug>)로 돌려보낼 수 있습니다.
// 등록되지 않은 slug면 공고 컨텍스트 없는 기본 경로로 돌려보냅니다.
function VariantB2B() {
  const { slug = "" } = useParams();
  if (!isVariantSlug(slug)) return <Navigate to="/b2b-platform" replace />;
  return <B2BProject />;
}

function VariantSub() {
  const { slug = "" } = useParams();
  if (!isVariantSlug(slug)) return <Navigate to="/sub-projects" replace />;
  return <SubProjects />;
}

function App() {
  useRouteFavicon();
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
