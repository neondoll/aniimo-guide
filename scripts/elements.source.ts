import { ElementIds } from "../src/enums/elements.ts";
import type { Element } from "../src/types/element.ts";

export const elements: Element[] = [
  { id: ElementIds.Dark, name: "Тьма", color: '#a373d2' },
  { id: ElementIds.Earth, name: "Камень", color: '#bea77b' },
  { id: ElementIds.Fire, name: "Огонь", color: '#e26161' },
  { id: ElementIds.Grass, name: "Трава", color: '#51b17a' },
  { id: ElementIds.Ice, name: "Лёд", color: '#45c1d6' },
  { id: ElementIds.Light, name: "Свет", color: '#f6a93c' },
  { id: ElementIds.Lightning, name: "Электричество", color: '#e0c21a' },
  { id: ElementIds.Water, name: "Вода", color: '#529de7' },
  { id: ElementIds.Wind, name: "Ветер", color: '#2a52be' },
];
