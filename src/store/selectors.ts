import { useMemo } from "react";

import { useElementsStore } from "./elements.store";
import { useFormsStore } from "./forms.store";
import { useHomeAbilitiesStore } from "./home-abilities.store";

export function useElementMap() {
  const elements = useElementsStore((s) => s.data);

  return useMemo(() => new Map(elements.map((e) => [e.id, e.name])), [elements]);
}

export function useFormMap() {
  const forms = useFormsStore((s) => s.data);

  return useMemo(() => new Map(forms.map((f) => [f.id, f])), [forms]);
}

export function useHomeAbilityMap() {
  const abilities = useHomeAbilitiesStore((s) => s.data);

  return useMemo(() => new Map(abilities.map((a) => [a.id, a])), [abilities]);
}
