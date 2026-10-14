import { ElementIds } from "../src/enums/elements.ts";
import type { Element } from "../src/types/element.ts";

const image = (value: string) => `images/elements/${value}`;

export const elements: Element[] = [
  { id: ElementIds.Dark, name: "Тьма", icon: image("dark.webp") },
  { id: ElementIds.Earth, name: "Земля", icon: image("earth.webp") },
  { id: ElementIds.Fire, name: "Огонь", icon: image("fire.webp") },
  { id: ElementIds.Grass, name: "Трава", icon: image("grass.webp") },
  { id: ElementIds.Ice, name: "Лед", icon: image("ice.webp") },
  { id: ElementIds.Light, name: "Свет", icon: image("light.webp") },
  { id: ElementIds.Lightning, name: "Молния", icon: image("lightning.webp") },
  { id: ElementIds.Water, name: "Вода", icon: image("water.webp") },
  { id: ElementIds.Wind, name: "Ветер", icon: image("wind.webp") },
];
