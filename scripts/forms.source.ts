import { FormIds } from "../src/enums/forms.ts";
import type { Form } from "../src/types/form.ts";

export const forms: Form[] = [
  { id: FormIds.Basic, name: "Базовая форма" },
  { id: FormIds.Bay, name: "Форма бухты" },
  { id: FormIds.Beach, name: "Форма пляжа" },
  { id: FormIds.Cloudmist, name: "Форма облачного тумана" },
  { id: FormIds.Flowerfield, name: "Форма моря цветов" },
  { id: FormIds.Forest, name: "Форма леса" },
  { id: FormIds.Grassland, name: "Форма луга" },
  { id: FormIds.Highland, name: "Форма высокогорья" },
  { id: FormIds.Mountain, name: "Форма гор" },
  { id: FormIds.MountainWoods, name: "Форма горного леса" },
  { id: FormIds.Mudflat, name: "Форма илистого берега" },
  { id: FormIds.Nighttime, name: "Форма ночи" },
  { id: FormIds.Plateau, name: "Форма плато" },
  { id: FormIds.Prismana, name: "Форма призманы", is_rare: true },
  { id: FormIds.Rainfall, name: "Форма ливня" },
  { id: FormIds.Snowfield, name: "Форма снежного поля" },
  { id: FormIds.Tempest, name: "Форма бури" },
  { id: FormIds.Thunderstorm, name: "Форма грозы" },
  { id: FormIds.Towerwood, name: "Форма башнедрева" },
  { id: FormIds.Waterfall, name: "Форма водопада" },
] as const;
