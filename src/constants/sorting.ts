// src/constants/sorting.ts
import { type ElementId, ElementIds } from '../enums/elements.ts';
import { type HomeAbilityId, HomeAbilityIds } from '../enums/home-abilities.ts';

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

export const HOME_ABILITY_ORDER: readonly HomeAbilityId[] = [
  ...ELEMENT_ORDER,
  HomeAbilityIds.Hauling,      // Нести
  HomeAbilityIds.Artisanship,  // Ремесло
  HomeAbilityIds.Leisure,      // Досуг
  HomeAbilityIds.Perfumery,    // Парфюмерия
];

/**
 * Компаратор по позиции в order. Всё, чего нет в order, уходит в конец
 * и сортируется между собой по алфавиту — так новые способности, если вы
 * добавите их позже, не будут ломать стабильность вывода.
 */
export function compareByOrder(
  order: readonly string[],
  a: string,
  b: string,
): number {
  const ai = order.indexOf(a);
  const bi = order.indexOf(b);

  const aIdx = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
  const bIdx = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;

  if (aIdx !== bIdx) return aIdx - bIdx;

  return a.localeCompare(b);
}