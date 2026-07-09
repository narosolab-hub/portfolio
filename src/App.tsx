import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import B2BProject from "./pages/B2BProject";
import SubProjects from "./pages/SubProjects";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/b2b-platform" element={<B2BProject />} />
      <Route path="/sub-projects" element={<SubProjects />} />
    </Routes>
  );
}

export default App;
