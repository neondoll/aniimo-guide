import { useAniimosStore } from './aniimos.store';
import { useElementsStore } from './elements.store';
import { useFormsStore } from './forms.store';
import { useHomeAbilitiesStore } from './home-abilities.store';

const META_URL = `${import.meta.env.BASE_URL}data/meta.json`;
const META_CACHE_KEY = 'aniimo-guide:meta-generated';

interface Meta {
  generatedAt: string;
  categories: string[];
}

async function fetchMeta(): Promise<Meta | null> {
  try {
    const res = await fetch(META_URL, { cache: 'no-cache' });
    if (!res.ok) return null;
    return (await res.json()) as Meta;
  } catch {
    return null;
  }
}

export async function bootstrapData(): Promise<void> {
  const meta = await fetchMeta();
  const cachedGeneration = localStorage.getItem(META_CACHE_KEY);

  // Если meta недоступна (offline) — работаем с тем, что есть в кэше.
  // Если meta есть и её generation отличается от закэшированной — форсим рефетч.
  const isStale = meta !== null && meta.generatedAt !== cachedGeneration;

  await Promise.all([
    useElementsStore.getState().fetchData(isStale),
    useFormsStore.getState().fetchData(isStale),
    useHomeAbilitiesStore.getState().fetchData(isStale),
    useAniimosStore.getState().fetchData(isStale),
  ]);

  // Фиксируем новую генерацию только если все категории загрузились без ошибок.
  const anyError =
    useElementsStore.getState().error ||
    useFormsStore.getState().error ||
    useHomeAbilitiesStore.getState().error ||
    useAniimosStore.getState().error;

  if (meta && !anyError) {
    localStorage.setItem(META_CACHE_KEY, meta.generatedAt);
  }
}