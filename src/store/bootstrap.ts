import { useAniimosStore } from "./aniimos.store";
import { useElementsStore } from "./elements.store";
import { useFacilitiesStore } from "./facilities.store";
import { useFamiliesStore } from "./families.store";
import { useFormsStore } from "./forms.store";
import { useHomelandAbilitiesStore } from "./homeland-abilities.store";
import { useRecommendationsStore } from "./recommendations.store";
import { useRegionsStore } from '@/store/regions.store.ts'

const META_URL = `${import.meta.env.BASE_URL}data/meta.json`;
const META_CACHE_KEY = "aniimo-guide:meta-generated";

interface Meta {
  generatedAt: string;
  categories: string[];
}

async function fetchMeta(): Promise<Meta | null> {
  try {
    const res = await fetch(META_URL, { cache: "no-cache" });

    if (!res.ok) return null;

    return (await res.json()) as Meta;
  }
  catch {
    return null;
  }
}

export async function bootstrapData(): Promise<void> {
  const meta = await fetchMeta();
  const cached = localStorage.getItem(META_CACHE_KEY);
  const isStale = meta !== null && meta.generatedAt !== cached;

  console.log("--- meta ---", meta);

  await Promise.all([
    useAniimosStore.getState().fetchData(isStale),
    useElementsStore.getState().fetchData(isStale),
    useFacilitiesStore.getState().fetchData(isStale),
    useFamiliesStore.getState().fetchData(isStale),
    useFormsStore.getState().fetchData(isStale),
    useHomelandAbilitiesStore.getState().fetchData(isStale),
    useRecommendationsStore.getState().fetchData(isStale),
    useRegionsStore.getState().fetchData(isStale),
  ]);

  const anyError =
    useAniimosStore.getState().error ||
    useElementsStore.getState().error ||
    useFacilitiesStore.getState().error ||
    useFamiliesStore.getState().error ||
    useFormsStore.getState().error ||
    useHomelandAbilitiesStore.getState().error ||
    useRecommendationsStore.getState().error ||
    useRegionsStore.getState().error;

  if (meta && !anyError) {
    localStorage.setItem(META_CACHE_KEY, meta.generatedAt);
  }
}
