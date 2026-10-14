import { FormIds } from "../src/enums/forms.ts";
import type { Form } from "../src/types/form.ts";

export const forms: Form[] = [
  { id: FormIds.Base, name: "Базовая форма" },
  { id: FormIds.Beach, name: "Форма пляжа" },
  { id: FormIds.Highland, name: "Форма высокогорья" },
  { id: FormIds.Mountain, name: "Форма гор" },
  { id: FormIds.MountainWoods, name: "Форма горного леса" },
  { id: FormIds.Prismana, name: "Призмана", is_rare: true },
  { id: FormIds.Rainstorm, name: "Форма ливня" },
  { id: FormIds.Snowfield, name: "Форма снежного поля" },
  { id: FormIds.Thunderstorm, name: "Форма грозы" },
] as const;
