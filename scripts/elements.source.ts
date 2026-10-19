import { ElementIds } from "../src/enums/elements.ts";
import type { Element } from "../src/types/element.ts";

export const elements: Element[] = [
  { id: ElementIds.Dark, name: "Тьма" },
  { id: ElementIds.Earth, name: "Земля" },
  { id: ElementIds.Fire, name: "Огонь" },
  { id: ElementIds.Grass, name: "Трава" },
  { id: ElementIds.Ice, name: "Лед" },
  { id: ElementIds.Light, name: "Свет" },
  { id: ElementIds.Lightning, name: "Молния" },
  { id: ElementIds.Water, name: "Вода" },
  { id: ElementIds.Wind, name: "Ветер" },
];
