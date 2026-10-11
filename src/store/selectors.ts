import { useMemo } from 'react';

import { useAniimoFormsStore } from './aniimo-forms.store';
import { useAniimosStore } from './aniimos.store';
import { useElementsStore } from './elements.store';
import type { Aniimo } from '../types/aniimo.type';

/** Группировка по номеру: несколько форм одного аниимо */
export function useAniimosByNo() {
  const aniimos = useAniimosStore((s) => s.data);

  return useMemo(() => {
    const map = new Map<string, Aniimo[]>();

    for (const a of aniimos) {
      const list = map.get(a.no);

      if (list) {
        list.push(a);
      }
      else {
        map.set(a.no, [a]);
      }
    }

    return [...map.values()];
  }, [aniimos]);
}

export function useAniimoFormMap() {
  const aniimoForms = useAniimoFormsStore((s) => s.data);

  return useMemo(() => new Map(aniimoForms.map((f) => [f.id, f.name])), [aniimoForms]);
}

export function useElementMap() {
  const elements = useElementsStore((s) => s.data);

  return useMemo(() => new Map(elements.map((e) => [e.id, e.name])), [elements]);
}