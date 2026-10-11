import { AniimoFormIds } from '../src/enums/aniimo-forms.enum.ts'
import type { AniimoForm } from '../src/types/aniimo-form.type.ts'

export const aniimoForms: AniimoForm[] = [
  { id: AniimoFormIds.Base, name: 'Базовая форма' },
  { id: AniimoFormIds.Beach, name: 'Форма пляжа' },
  { id: AniimoFormIds.Downpour, name: 'Форма ливня' },
  { id: AniimoFormIds.Highland, name: 'Форма высокогорья' },
  { id: AniimoFormIds.MountainForest, name: 'Форма горного леса' },
  { id: AniimoFormIds.Prizmana, name: 'Призмана' },
  { id: AniimoFormIds.Thunderstorm, name: 'Форма грозы' },
] as const;
