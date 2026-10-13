import { elements } from './elements.source.ts'
import { HomeAbilityIds } from '../src/enums/home-abilities.enum.ts'
import type { HomeAbility } from '../src/types/home-ability.type.ts'

export const homeAbilities: HomeAbility[] = [
  ...elements,
  { id: HomeAbilityIds.Carry, name: 'Нести' },
  { id: HomeAbilityIds.Craft, name: 'Ремесло' },
  { id: HomeAbilityIds.Leisure, name: 'Досуг' },
];
