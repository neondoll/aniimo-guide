import { FormIds } from '../src/enums/forms.enum.ts'
import type { Form } from '../src/types/form.type.ts'

export const forms: Form[] = [
  { id: FormIds.Base, name: 'Базовая форма' },
  { id: FormIds.Beach, name: 'Форма пляжа' },
  { id: FormIds.Downpour, name: 'Форма ливня' },
  { id: FormIds.Highland, name: 'Форма высокогорья' },
  { id: FormIds.MountainForest, name: 'Форма горного леса' },
  { id: FormIds.Mountains, name: 'Форма гор' },
  { id: FormIds.Prizmana, name: 'Призмана' },
  { id: FormIds.SnowyField, name: 'Форма снежного поля' },
  { id: FormIds.Thunderstorm, name: 'Форма грозы' },
] as const;
