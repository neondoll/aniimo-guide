import { useMemo } from 'react';

import { useAniimosStore } from './aniimos.store';
import { useElementsStore } from './elements.store';
import { useFormsStore } from './forms.store';
import { useHomeAbilitiesStore } from './home-abilities.store'
import type { ElementId } from '../types/element.type'
import type { HomeAbilityId } from '../types/home-ability.type'

export function useAniimosByElement(elementId: ElementId) {
  const aniimos = useAniimosStore((s) => s.data);

  return useMemo(
    () => aniimos.filter((a) => a.forms.some((f) => f.element_ids.includes(elementId))),
    [aniimos, elementId],
  );
}

export function useAniimosByHomeAbility(abilityId: HomeAbilityId, minLevel = 1) {
  const aniimos = useAniimosStore((s) => s.data);

  return useMemo(
    () => aniimos.filter((a) =>
      a.forms.some((f) => f.home_abilities.some((ha) => ha.id === abilityId && ha.level >= minLevel)),
    ),
    [aniimos, abilityId, minLevel],
  );
}

export function useElementMap() {
  const elements = useElementsStore((s) => s.data);

  return useMemo(() => new Map(elements.map((e) => [e.id, e.name])), [elements]);
}

export function useFormMap() {
  const aniimoForms = useFormsStore((s) => s.data);

  return useMemo(() => new Map(aniimoForms.map((f) => [f.id, f.name])), [aniimoForms]);
}

export function useHomeAbilityMap() {
  const abilities = useHomeAbilitiesStore((s) => s.data);

  return useMemo(() => new Map(abilities.map((a) => [a.id, a])), [abilities]);
}

export function useMaxLevelByAbility(abilityId: HomeAbilityId) {
  const aniimos = useAniimosStore((s) => s.data);
  return useMemo(() => {
    const out = new Map<string, number>();
    for (const a of aniimos) {
      let max = 0;
      for (const f of a.forms) {
        for (const ha of f.home_abilities) {
          if (ha.id === abilityId && ha.level > max) max = ha.level;
        }
      }
      if (max > 0) out.set(a.no, max);
    }
    return out;
  }, [aniimos, abilityId]);
}
