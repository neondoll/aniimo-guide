import { Route, Routes } from "react-router-dom";

import { HeaderNavigation } from "@/components/HeaderNavigation";
import { useBootstrapData } from "@/hooks/use-bootstrap-data";
import { AboutPage } from "@/pages/AboutPage";
import { AniimoDetailPage } from "@/pages/AniimoDetailPage";
import { AniimosPage } from "@/pages/AniimosPage";
import { ElementsPage } from "@/pages/ElementsPage";
import { EvolutionToolPage } from "@/pages/EvolutionToolPage";
import { FacilitiesPage } from "@/pages/FacilitiesPage";
import { HomeAbilitiesPage } from "@/pages/HomeAbilitiesPage";

export default function App() {
  const { ready, error } = useBootstrapData();

  if (error) return <div className="p-6 text-red-600">Ошибка загрузки данных: {error}</div>;

  if (!ready) return <div className="p-6">Загрузка…</div>;

  return (
    <>
      <HeaderNavigation />

      <main>
        <Routes>
          <Route path="/" element={<AniimosPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/aniimos" element={<AniimosPage />} />
          <Route path="/aniimos/:slug" element={<AniimoDetailPage />} />
          <Route path="/elements" element={<ElementsPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/home-abilities" element={<HomeAbilitiesPage />} />
          <Route path="/tools/evolution" element={<EvolutionToolPage />} />
        </Routes>
      </main>
    </>
  );
}
