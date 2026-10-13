import { ElementIds } from '../src/enums/elements.enum.ts'
import { FormIds } from '../src/enums/forms.enum.ts'
import { HomeAbilityIds } from '../src/enums/home-abilities.enum.ts'
import type { AniimoHomeAbilityAssignment } from '../src/types/aniimo.type.ts'
import type { FormId } from '../src/types/form.type.ts'
import type { ElementId } from '../src/types/element.type.ts'

export interface AniimoFormSource {
  no: string;
  name: string;
  form_id: FormId;
  element_ids: ElementId[];
  home_abilities: AniimoHomeAbilityAssignment[];
}

export const aniimos: AniimoFormSource[] = [
  // --- 001 - Искрокус ---
  {
    no: '001', name: 'Искрокус', form_id: FormIds.Base, element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 1 }, { id: HomeAbilityIds.Carry, level: 1 }],
  },
  {
    no: '001', name: 'Искрокус', form_id: FormIds.Highland, element_ids: [ElementIds.Fire, ElementIds.Earth],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 1 }, { id: HomeAbilityIds.Earth, level: 1 },
      { id: HomeAbilityIds.Carry, level: 1 },
    ],
  },
  {
    no: '001', name: 'Искрокус', form_id: FormIds.MountainForest, element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 1 }, { id: HomeAbilityIds.Carry, level: 1 }],
  },
  // --- 002 - Пламешерст ---
  {
    no: '002', name: 'Пламешерст', form_id: FormIds.Base, element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 2 }, { id: HomeAbilityIds.Carry, level: 2 }],
  },
  {
    no: '002', name: 'Пламешерст', form_id: FormIds.Highland, element_ids: [ElementIds.Fire, ElementIds.Earth],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 2 }, { id: HomeAbilityIds.Earth, level: 1 },
      { id: HomeAbilityIds.Carry, level: 2 },
    ],
  },
  {
    no: '002', name: 'Пламешерст', form_id: FormIds.MountainForest, element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 2 }, { id: HomeAbilityIds.Carry, level: 2 }],
  },
  // --- 003 - Волкожог ---
  {
    no: '003', name: 'Волкожог', form_id: FormIds.Base, element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 3 }, { id: HomeAbilityIds.Carry, level: 3 }],
  },
  {
    no: '003', name: 'Волкожог', form_id: FormIds.Highland, element_ids: [ElementIds.Fire, ElementIds.Earth],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 3 }, { id: HomeAbilityIds.Earth, level: 2 },
      { id: HomeAbilityIds.Carry, level: 3 },
    ],
  },
  {
    no: '003', name: 'Волкожог', form_id: FormIds.Thunderstorm, element_ids: [ElementIds.Fire, ElementIds.Lightning],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 3 }, { id: HomeAbilityIds.Lightning, level: 2 },
      { id: HomeAbilityIds.Carry, level: 3 },
    ],
  },
  {
    no: '003', name: 'Волкожог', form_id: FormIds.Prizmana, element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 4 }, { id: HomeAbilityIds.Carry, level: 4 }],
  },
  {
    no: '003', name: 'Волкожог', form_id: FormIds.MountainForest, element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 3 }, { id: HomeAbilityIds.Carry, level: 3 }],
  },
  // --- 004 - Пламеклык ---
  {
    no: '004', name: 'Пламеклык', form_id: FormIds.Base, element_ids: [ElementIds.Dark, ElementIds.Fire],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 2 }, { id: HomeAbilityIds.Dark, level: 3 },
      { id: HomeAbilityIds.Carry, level: 3 },
    ],
  },
  {
    no: '004', name: 'Пламеклык', form_id: FormIds.Prizmana, element_ids: [ElementIds.Dark, ElementIds.Fire],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 3 }, { id: HomeAbilityIds.Dark, level: 4 },
      { id: HomeAbilityIds.Carry, level: 4 },
    ],
  },
  // --- 005 - Селестис ---
  {
    no: '005', name: 'Селестис', form_id: FormIds.Base, element_ids: [ElementIds.Dark],
    home_abilities: [{ id: HomeAbilityIds.Dark, level: 1 }, { id: HomeAbilityIds.Leisure, level: 1 }],
  },
  // --- 006 - Стелларис ---
  {
    no: '006', name: 'Стелларис', form_id: FormIds.Base, element_ids: [ElementIds.Dark],
    home_abilities: [{ id: HomeAbilityIds.Dark, level: 3 }, { id: HomeAbilityIds.Leisure, level: 3 }],
  },
  {
    no: '006', name: 'Стелларис', form_id: FormIds.Downpour, element_ids: [ElementIds.Dark, ElementIds.Water],
    home_abilities: [
      { id: HomeAbilityIds.Water, level: 2 }, { id: HomeAbilityIds.Dark, level: 3 },
      { id: HomeAbilityIds.Leisure, level: 3 },
    ],
  },
  {
    no: '006', name: 'Стелларис', form_id: FormIds.Prizmana, element_ids: [ElementIds.Dark, ElementIds.Ice],
    home_abilities: [
      { id: HomeAbilityIds.Ice, level: 3 }, { id: HomeAbilityIds.Dark, level: 4 },
      { id: HomeAbilityIds.Leisure, level: 4 },
    ],
  },
  // --- 007 - Чайкуша ---
  {
    no: '007', name: 'Чайкуша', form_id: FormIds.Base, element_ids: [ElementIds.Wind],
    home_abilities: [{ id: HomeAbilityIds.Wind, level: 1 }],
  },
  {
    no: '007', name: 'Чайкуша', form_id: FormIds.Beach, element_ids: [ElementIds.Wind, ElementIds.Water],
    home_abilities: [{ id: HomeAbilityIds.Water, level: 1 }, { id: HomeAbilityIds.Wind, level: 1 }],
  },
  {
    no: '007', name: 'Чайкуша', form_id: FormIds.Highland, element_ids: [ElementIds.Wind, ElementIds.Grass],
    home_abilities: [{ id: HomeAbilityIds.Grass, level: 1 }, { id: HomeAbilityIds.Wind, level: 1 }],
  },
  // --- 020 - Бормотун ---
  {
    no: '020', name: 'Бормотун', form_id: FormIds.Base, element_ids: [ElementIds.Grass],
    home_abilities: [{ id: HomeAbilityIds.Grass, level: 1 }],
  },
  {
    no: '020', name: 'Бормотун', form_id: FormIds.Mountains, element_ids: [ElementIds.Grass],
    home_abilities: [{ id: HomeAbilityIds.Grass, level: 1 }],
  },
  // --- 021 - Ведьмун ---
  {
    no: '021', name: 'Ведьмун', form_id: FormIds.Base, element_ids: [ElementIds.Grass, ElementIds.Dark],
    home_abilities: [
      { id: HomeAbilityIds.Grass, level: 1 }, { id: HomeAbilityIds.Dark, level: 2 },
      { id: HomeAbilityIds.Craft, level: 2 },

    ],
  },
  {
    no: '021', name: 'Ведьмун', form_id: FormIds.Mountains, element_ids: [ElementIds.Grass, ElementIds.Dark],
    home_abilities: [
      { id: HomeAbilityIds.Grass, level: 1 }, { id: HomeAbilityIds.Dark, level: 2 },
      { id: HomeAbilityIds.Craft, level: 2 },

    ],
  },
  {
    no: '021', name: 'Ведьмун', form_id: FormIds.Prizmana, element_ids: [ElementIds.Grass, ElementIds.Dark],
    home_abilities: [
      { id: HomeAbilityIds.Grass, level: 3 }, { id: HomeAbilityIds.Dark, level: 4 },
      { id: HomeAbilityIds.Craft, level: 4 },

    ],
  },
  // --- 022 - Топотун ---
  {
    no: '022', name: 'Топотун', form_id: FormIds.Base, element_ids: [ElementIds.Grass],
    home_abilities: [{ id: HomeAbilityIds.Grass, level: 3 }, { id: HomeAbilityIds.Carry, level: 3 }],
  },
  {
    no: '022', name: 'Топотун', form_id: FormIds.Mountains, element_ids: [ElementIds.Grass, ElementIds.Earth],
    home_abilities: [
      { id: HomeAbilityIds.Grass, level: 3 }, { id: HomeAbilityIds.Earth, level: 2 },
      { id: HomeAbilityIds.Carry, level: 3 },

    ],
  },
  // --- 047 - Белкулак ---
  {
    no: '047', name: 'Белкулак', form_id: FormIds.Base, element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 1 }, { id: HomeAbilityIds.Craft, level: 1 }],
  },
  // --- 048 - Хвостобой ---
  {
    no: '048', name: 'Хвостобой', form_id: FormIds.Base, element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 2 }, { id: HomeAbilityIds.Craft, level: 2 }],
  },
  // --- 056 - Балитл ---
  {
    no: '056', name: 'Балитл', form_id: FormIds.Base, element_ids: [ElementIds.Earth],
    home_abilities: [{ id: HomeAbilityIds.Earth, level: 1 }, { id: HomeAbilityIds.Carry, level: 1 }],
  },
  {
    no: '056', name: 'Балитл', form_id: FormIds.SnowyField, element_ids: [ElementIds.Earth, ElementIds.Ice],
    home_abilities: [
      { id: HomeAbilityIds.Earth, level: 1 }, { id: HomeAbilityIds.Ice, level: 1 },
      { id: HomeAbilityIds.Carry, level: 1 },
    ],
  },
  // --- 057 - Валитл ---
  {
    no: '057', name: 'Валитл', form_id: FormIds.Base, element_ids: [ElementIds.Earth],
    home_abilities: [{ id: HomeAbilityIds.Earth, level: 3 }, { id: HomeAbilityIds.Carry, level: 3 }],
  },
  {
    no: '057', name: 'Валитл', form_id: FormIds.SnowyField, element_ids: [ElementIds.Earth, ElementIds.Ice],
    home_abilities: [
      { id: HomeAbilityIds.Earth, level: 3 }, { id: HomeAbilityIds.Ice, level: 2 },
      { id: HomeAbilityIds.Carry, level: 3 },
    ],
  },
  {
    no: '057', name: 'Валитл', form_id: FormIds.Prizmana, element_ids: [ElementIds.Earth, ElementIds.Dark],
    home_abilities: [
      { id: HomeAbilityIds.Earth, level: 4 }, { id: HomeAbilityIds.Dark, level: 3 },
      { id: HomeAbilityIds.Carry, level: 4 },
    ],
  },
  // --- 058 - Камнюс ---
  {
    no: '058', name: 'Камнюс', form_id: FormIds.Base, element_ids: [ElementIds.Earth],
    home_abilities: [{ id: HomeAbilityIds.Earth, level: 3 }, { id: HomeAbilityIds.Carry, level: 3 }],
  },
  {
    no: '058', name: 'Камнюс', form_id: FormIds.SnowyField, element_ids: [ElementIds.Earth, ElementIds.Ice],
    home_abilities: [
      { id: HomeAbilityIds.Earth, level: 3 }, { id: HomeAbilityIds.Ice, level: 2 },
      { id: HomeAbilityIds.Carry, level: 3 },
    ],
  },
];
