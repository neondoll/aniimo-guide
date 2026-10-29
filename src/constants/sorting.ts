import { type ElementId, ElementIds } from '../enums/elements.ts';
import { type HomelandAbilityId, HomelandAbilityIds } from '../enums/homeland-abilities.ts';

export const ELEMENT_ORDER: readonly ElementId[] = [
  ElementIds.Ice,
  ElementIds.Water,
  ElementIds.Lightning,
  ElementIds.Fire,
  ElementIds.Grass,
  ElementIds.Earth,
  ElementIds.Wind,
  ElementIds.Dark,
  ElementIds.Light,
];

export const HOME_ABILITY_ORDER: readonly HomelandAbilityId[] = [
  HomelandAbilityIds.Hauling,
  HomelandAbilityIds.Artisanship,
  HomelandAbilityIds.Leisure,
  HomelandAbilityIds.Perfumery,
];

export function compareByOrder<T extends string>(order: readonly T[], a: T, b: T): number {
  const ai = order.indexOf(a);
  const bi = order.indexOf(b);

  const aIdx = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
  const bIdx = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;

  if (aIdx !== bIdx) return aIdx - bIdx;

  return a.localeCompare(b);
}
