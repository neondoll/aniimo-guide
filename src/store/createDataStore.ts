import { create, type StoreApi, type UseBoundStore } from "zustand";
import { persist } from "zustand/middleware";

export interface DataState<T> {
  data: T;
  loadedAt: number | null;
  loading: boolean;
  error: string | null;
  fetchData: (force?: boolean) => Promise<void>;
}

interface Options<T> {
  name: string;
  url: string;
  version?: number;
  initialData: T;
}

export function createDataStore<T>(
  { name, url, version = 1, initialData }: Options<T>,
): UseBoundStore<StoreApi<DataState<T>>> {
  return create<DataState<T>>()(
    persist(
      (set, get) => ({
        data: initialData,
        loadedAt: null,
        loading: false,
        error: null,
        fetchData: async (force = false) => {
          const { loadedAt, loading } = get();

          if (loading) return;

          if (!force && loadedAt) return;

          set({ loading: true, error: null });

          try {
            const res = await fetch(`${import.meta.env.BASE_URL}${url}`);

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = (await res.json()) as T;

            set({ data, loadedAt: Date.now(), loading: false });
          }
          catch (e) {
            set({ error: e instanceof Error ? e.message : "Unknown error", loading: false });
          }
        },
      }),
      {
        name: `aniimo-guide:${name}`,
        version,
        partialize: (s) => ({ data: s.data, loadedAt: s.loadedAt }),
      },
    ),
  );
}
