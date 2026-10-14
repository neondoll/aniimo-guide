import { Route, Routes } from 'react-router-dom';

import { useBootstrapData } from '@/hooks/use-bootstrap-data';
import { AboutPage } from '@/pages/AboutPage';
import { AniimoDetailPage } from '@/pages/AniimoDetailPage';
import { AniimosPage } from '@/pages/AniimosPage';
import { ElementsPage } from '@/pages/ElementsPage';
import { EvolutionToolPage } from '@/pages/EvolutionToolPage';
import { FacilitiesPage } from '@/pages/FacilitiesPage';
import { HomeAbilitiesPage } from '@/pages/HomeAbilitiesPage';
import { HeaderNavigation } from '@/components/HeaderNavigation.tsx'

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
          <Route path="/aniimos" element={<AniimosPage />} />
          <Route path="/aniimos/:no" element={<AniimoDetailPage />} />
          <Route path="/elements" element={<ElementsPage />} />
          <Route path="/home-abilities" element={<HomeAbilitiesPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/tools/evolution" element={<EvolutionToolPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </>
  );
}
