import { AniimoFormIds } from '../src/enums/aniimo-forms.enum.ts'
import { ElementIds } from '../src/enums/elements.enum.ts'
import type { Aniimo } from '../src/types/aniimo.type.ts'

export const aniimos: Aniimo[] = [
  { no: '001', name: 'Искрокус', form_id: AniimoFormIds.Base, element_ids: [ElementIds.Fire] },
  { no: '001', name: 'Искрокус', form_id: AniimoFormIds.Highland, element_ids: [ElementIds.Fire, ElementIds.Earth] },
  { no: '001', name: 'Искрокус', form_id: AniimoFormIds.MountainForest, element_ids: [ElementIds.Fire] },
  { no: '002', name: 'Пламешерст', form_id: AniimoFormIds.Base, element_ids: [ElementIds.Fire] },
  { no: '002', name: 'Пламешерст', form_id: AniimoFormIds.Highland, element_ids: [ElementIds.Fire, ElementIds.Earth] },
  { no: '002', name: 'Пламешерст', form_id: AniimoFormIds.MountainForest, element_ids: [ElementIds.Fire] },
  { no: '003', name: 'Волкожог', form_id: AniimoFormIds.Base, element_ids: [ElementIds.Fire] },
  { no: '003', name: 'Волкожог', form_id: AniimoFormIds.Highland, element_ids: [ElementIds.Fire, ElementIds.Earth] },
  { no: '003', name: 'Волкожог', form_id: AniimoFormIds.Thunderstorm, element_ids: [ElementIds.Fire, ElementIds.Lightning] },
  { no: '003', name: 'Волкожог', form_id: AniimoFormIds.Prizmana, element_ids: [ElementIds.Fire] },
  { no: '003', name: 'Волкожог', form_id: AniimoFormIds.MountainForest, element_ids: [ElementIds.Fire] },
  { no: '004', name: 'Пламеклык', form_id: AniimoFormIds.Base, element_ids: [ElementIds.Dark, ElementIds.Fire] },
  { no: '004', name: 'Пламеклык', form_id: AniimoFormIds.Prizmana, element_ids: [ElementIds.Dark, ElementIds.Fire] },
  { no: '005', name: 'Селестис', form_id: AniimoFormIds.Base, element_ids: [ElementIds.Dark] },
  { no: '006', name: 'Стелларис', form_id: AniimoFormIds.Base, element_ids: [ElementIds.Dark] },
  { no: '006', name: 'Стелларис', form_id: AniimoFormIds.Downpour, element_ids: [ElementIds.Dark, ElementIds.Water] },
  { no: '006', name: 'Стелларис', form_id: AniimoFormIds.Prizmana, element_ids: [ElementIds.Dark, ElementIds.Ice] },
  { no: '007', name: 'Чайкуша', form_id: AniimoFormIds.Base, element_ids: [ElementIds.Wind] },
  { no: '007', name: 'Чайкуша', form_id: AniimoFormIds.Beach, element_ids: [ElementIds.Wind, ElementIds.Water] },
  { no: '007', name: 'Чайкуша', form_id: AniimoFormIds.Highland, element_ids: [ElementIds.Wind, ElementIds.Grass] },
];
