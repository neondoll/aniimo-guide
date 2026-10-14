import { NavLink, Route, Routes } from "react-router-dom";

import { useBootstrapData } from "./hooks/use-bootstrap-data";
import { AniimosPage } from "./pages/AniimosPage";
import { AniimoDetailPage } from "./pages/AniimoDetailPage";
import { RecommendationsPage } from "./pages/RecommendationsPage";

export default function App() {
  const { ready, error } = useBootstrapData();

  if (error) {
    return <div className="p-6 text-red-600">Ошибка загрузки данных: {error}</div>;
  }

  if (!ready) {
    return <div className="p-6">Загрузка…</div>;
  }

  return (
    <>
      <nav className="p-4 border-b flex gap-4">
        <NavLink to="/aniimos" className={({ isActive }) => isActive ? "font-bold" : ""}>
          Аниимо
        </NavLink>
        <NavLink to="/recommendations" className={({ isActive }) => isActive ? "font-bold" : ""}>
          Рекомендации
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<AniimosPage  />} />
        <Route path="/aniimos" element={<AniimosPage />} />
        <Route path="/aniimos/:no" element={<AniimoDetailPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
      </Routes>
    </>
  );
}
