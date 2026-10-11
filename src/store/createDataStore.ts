import { create, type StoreApi, type UseBoundStore } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DataState<T> {
  data: T[];
  loadedAt: number | null;
  loading: boolean;
  error: string | null;
  fetchData: (force?: boolean) => Promise<void>;
}

interface Options {
  name: string;       // ключ localStorage
  url: string;        // путь к JSON относительно base
  version?: number;   // ручная инвалидация при смене структуры
}

export function createDataStore<T>({ name, url, version = 1 }: Options): UseBoundStore<StoreApi<DataState<T>>> {
  return create<DataState<T>>()(
    persist(
      (set, get) => ({
        data: [],
        loadedAt: null,
        loading: false,
        error: null,
        fetchData: async (force = false) => {
          const { loadedAt, loading } = get();
          if (loading) return;
          if (!force && loadedAt) return; // из кэша

          set({ loading: true, error: null });
          try {
            const res = await fetch(`${import.meta.env.BASE_URL}${url}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = (await res.json()) as T[];
            set({ data, loadedAt: Date.now(), loading: false });
          }
          catch (e) {
            set({ error: e instanceof Error ? e.message : 'Unknown error', loading: false });
          }
        },
      }),
      {
        name: `aniimo-guide:${name}`,
        version,
        // ВАЖНО: кэшируем только данные, не transient-состояние
        partialize: (s) => ({ data: s.data, loadedAt: s.loadedAt }),
      },
    ),
  );
}
