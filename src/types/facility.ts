import type { PartialPersonality } from "./personality.ts";
import type { FamilyId } from "../enums/families.ts";
import type { HomeAbilityId } from "../enums/home-abilities.ts";

export interface Facility {
  id: string;
  name: string;
  description?: string;
  /** Пустой массив = либо способности не требуются, либо ещё не изучено. */
  requires_abilities: HomeAbilityId[];
  /** Пустой массив = семейных ограничений нет. */
  requires_families: FamilyId[];
  /** Отсутствует = предпочтений по характеру нет. */
  preferred_personality?: PartialPersonality;
}