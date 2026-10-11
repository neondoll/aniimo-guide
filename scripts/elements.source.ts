import { ElementIds } from '../src/enums/elements.enum.ts'
import type { Element } from '../src/types/element.type.ts'

export const elements: Element[] = [
  { id: ElementIds.Dark, name: 'Тьма' },
  { id: ElementIds.Earth, name: 'Земля' },
  { id: ElementIds.Fire, name: 'Огонь' },
  { id: ElementIds.Grass, name: 'Трава' },
  { id: ElementIds.Ice, name: 'Лед' },
  { id: ElementIds.Lightning, name: 'Молния' },
  { id: ElementIds.Water, name: 'Вода' },
  { id: ElementIds.Wind, name: 'Ветер' },
];
