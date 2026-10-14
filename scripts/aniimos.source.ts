import { type AniimoNo, AniimoNos } from "../src/enums/aniimos.ts";
import { type ElementId, ElementIds } from "../src/enums/elements.ts";
import { type FormId, FormIds } from "../src/enums/forms.ts";
import { HomeAbilityIds } from "../src/enums/home-abilities.ts";
import type { HomeAbilityAssignment } from "../src/types/aniimo.ts";

export interface AniimoFormSource {
  no: AniimoNo;
  name: string;
  form_id: FormId;
  element_ids: ElementId[];
  home_abilities: HomeAbilityAssignment[];
  image?: string;
}

const image = (value: string) => `images/aniimos/${value}`;

export const aniimos: AniimoFormSource[] = [
  // --- 001 - Искрокус ---
  {
    no: AniimoNos.Emberpup,
    name: "Искрокус",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 1 }, { id: HomeAbilityIds.Hauling, level: 1 }],
    image: image("001-base.webp"),
  },
  {
    no: AniimoNos.Emberpup,
    name: "Искрокус",
    form_id: FormIds.Highland,
    element_ids: [ElementIds.Fire, ElementIds.Earth],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 1 },
      { id: HomeAbilityIds.Earth, level: 1 },
      { id: HomeAbilityIds.Hauling, level: 1 },
    ],
    image: image("001-highland.webp"),
  },
  {
    no: AniimoNos.Emberpup,
    name: "Искрокус",
    form_id: FormIds.MountainWoods,
    element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 1 }, { id: HomeAbilityIds.Hauling, level: 1 }],
    image: image("001-mountain_woods.webp"),
  },
  // --- 002 - Пламешерст ---
  {
    no: AniimoNos.Flameruff,
    name: "Пламешерст",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 2 }, { id: HomeAbilityIds.Hauling, level: 2 }],
    image: image("002-base.webp"),
  },
  {
    no: AniimoNos.Flameruff,
    name: "Пламешерст",
    form_id: FormIds.Highland,
    element_ids: [ElementIds.Fire, ElementIds.Earth],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 2 },
      { id: HomeAbilityIds.Earth, level: 1 },
      { id: HomeAbilityIds.Hauling, level: 2 },
    ],
    image: image("002-highland.webp"),
  },
  {
    no: AniimoNos.Flameruff,
    name: "Пламешерст",
    form_id: FormIds.MountainWoods,
    element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 2 }, { id: HomeAbilityIds.Hauling, level: 2 }],
    image: image("002-mountain_woods.webp"),
  },
  // --- 003 - Волкожог ---
  {
    no: AniimoNos.Scorchhowl,
    name: "Волкожог",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 3 }, { id: HomeAbilityIds.Hauling, level: 3 }],
    image: image("003-base.webp"),
  },
  {
    no: AniimoNos.Scorchhowl,
    name: "Волкожог",
    form_id: FormIds.Highland,
    element_ids: [ElementIds.Fire, ElementIds.Earth],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 3 },
      { id: HomeAbilityIds.Earth, level: 2 },
      { id: HomeAbilityIds.Hauling, level: 3 },
    ],
    image: image("003-highland.webp"),
  },
  {
    no: AniimoNos.Scorchhowl,
    name: "Волкожог",
    form_id: FormIds.Thunderstorm,
    element_ids: [ElementIds.Fire, ElementIds.Lightning],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 3 },
      { id: HomeAbilityIds.Lightning, level: 2 },
      { id: HomeAbilityIds.Hauling, level: 3 },
    ],
    image: image("003-thunderstorm.webp"),
  },
  {
    no: AniimoNos.Scorchhowl,
    name: "Волкожог",
    form_id: FormIds.Prismana,
    element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 4 }, { id: HomeAbilityIds.Hauling, level: 4 }],
    image: image("003-prismana.webp"),
  },
  {
    no: AniimoNos.Scorchhowl,
    name: "Волкожог",
    form_id: FormIds.MountainWoods,
    element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 3 }, { id: HomeAbilityIds.Hauling, level: 3 }],
    image: image("003-mountain_woods.webp"),
  },
  // --- 004 - Пламеклык ---
  {
    no: AniimoNos.Inferlupa,
    name: "Пламеклык",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Dark, ElementIds.Fire],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 2 },
      { id: HomeAbilityIds.Dark, level: 3 },
      { id: HomeAbilityIds.Hauling, level: 3 },
    ],
    image: image("004-base.webp"),
  },
  {
    no: AniimoNos.Inferlupa,
    name: "Пламеклык",
    form_id: FormIds.Prismana,
    element_ids: [ElementIds.Dark, ElementIds.Fire],
    home_abilities: [
      { id: HomeAbilityIds.Fire, level: 3 },
      { id: HomeAbilityIds.Dark, level: 4 },
      { id: HomeAbilityIds.Hauling, level: 4 },
    ],
    image: image("004-prismana.webp"),
  },
  // --- 005 - Селестис ---
  {
    no: AniimoNos.Celestis,
    name: "Селестис",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Dark],
    home_abilities: [{ id: HomeAbilityIds.Dark, level: 1 }, { id: HomeAbilityIds.Leisure, level: 1 }],
  },
  // --- 006 - Стелларис ---
  {
    no: AniimoNos.Stellarys,
    name: "Стелларис",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Dark],
    home_abilities: [{ id: HomeAbilityIds.Dark, level: 3 }, { id: HomeAbilityIds.Leisure, level: 3 }],
  },
  {
    no: AniimoNos.Stellarys,
    name: "Стелларис",
    form_id: FormIds.Rainstorm,
    element_ids: [ElementIds.Dark, ElementIds.Water],
    home_abilities: [
      { id: HomeAbilityIds.Dark, level: 3 },
      { id: HomeAbilityIds.Water, level: 2 },
      { id: HomeAbilityIds.Leisure, level: 3 },
    ],
  },
  {
    no: AniimoNos.Stellarys,
    name: "Стелларис",
    form_id: FormIds.Prismana,
    element_ids: [ElementIds.Dark, ElementIds.Ice],
    home_abilities: [
      { id: HomeAbilityIds.Dark, level: 4 },
      { id: HomeAbilityIds.Ice, level: 3 },
      { id: HomeAbilityIds.Leisure, level: 4 },
    ],
  },
  // --- 007 - Чайкуша ---
  {
    no: AniimoNos.Chirpi,
    name: "Чайкуша",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Wind],
    home_abilities: [{ id: HomeAbilityIds.Wind, level: 1 }],
  },
  {
    no: AniimoNos.Chirpi,
    name: "Чайкуша",
    form_id: FormIds.Beach,
    element_ids: [ElementIds.Wind, ElementIds.Water],
    home_abilities: [{ id: HomeAbilityIds.Wind, level: 1 }, { id: HomeAbilityIds.Water, level: 1 }],
  },
  {
    no: AniimoNos.Chirpi,
    name: "Чайкуша",
    form_id: FormIds.Highland,
    element_ids: [ElementIds.Wind, ElementIds.Grass],
    home_abilities: [{ id: HomeAbilityIds.Wind, level: 1 }, { id: HomeAbilityIds.Grass, level: 1 }],
  },
  // --- 020 - Бормотун ---
  {
    no: AniimoNos.Hummin,
    name: "Бормотун",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Grass],
    home_abilities: [{ id: HomeAbilityIds.Grass, level: 1 }],
  },
  {
    no: AniimoNos.Hummin,
    name: "Бормотун",
    form_id: FormIds.Mountain,
    element_ids: [ElementIds.Grass],
    home_abilities: [{ id: HomeAbilityIds.Grass, level: 1 }],
  },
  // --- 021 - Ведьмун ---
  {
    no: AniimoNos.Hexxin,
    name: "Ведьмун",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Grass, ElementIds.Dark],
    home_abilities: [
      { id: HomeAbilityIds.Grass, level: 1 },
      { id: HomeAbilityIds.Dark, level: 2 },
      { id: HomeAbilityIds.Artisanship, level: 2 },
    ],
  },
  {
    no: AniimoNos.Hexxin,
    name: "Ведьмун",
    form_id: FormIds.Mountain,
    element_ids: [ElementIds.Grass, ElementIds.Dark],
    home_abilities: [
      { id: HomeAbilityIds.Grass, level: 1 },
      { id: HomeAbilityIds.Dark, level: 2 },
      { id: HomeAbilityIds.Artisanship, level: 2 },
    ],
  },
  {
    no: AniimoNos.Hexxin,
    name: "Ведьмун",
    form_id: FormIds.Prismana,
    element_ids: [ElementIds.Grass, ElementIds.Dark],
    home_abilities: [
      { id: HomeAbilityIds.Grass, level: 3 },
      { id: HomeAbilityIds.Dark, level: 4 },
      { id: HomeAbilityIds.Artisanship, level: 4 },
    ],
  },
  // --- 022 - Топотун ---
  {
    no: AniimoNos.Tuckin,
    name: "Топотун",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Grass],
    home_abilities: [{ id: HomeAbilityIds.Grass, level: 3 }, { id: HomeAbilityIds.Hauling, level: 3 }],
  },
  {
    no: AniimoNos.Tuckin,
    name: "Топотун",
    form_id: FormIds.Mountain,
    element_ids: [ElementIds.Grass, ElementIds.Earth],
    home_abilities: [
      { id: HomeAbilityIds.Grass, level: 3 },
      { id: HomeAbilityIds.Earth, level: 2 },
      { id: HomeAbilityIds.Hauling, level: 3 },
    ],
  },
  // --- 047 - Белкулак ---
  {
    no: AniimoNos.Squarrel,
    name: "Белкулак",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 1 }, { id: HomeAbilityIds.Artisanship, level: 1 }],
  },
  // --- 048 - Хвостобой ---
  {
    no: AniimoNos.Squashel,
    name: "Хвостобой",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Fire],
    home_abilities: [{ id: HomeAbilityIds.Fire, level: 2 }, { id: HomeAbilityIds.Artisanship, level: 2 }],
  },
  // --- 056 - Балитл ---
  {
    no: AniimoNos.Baleetle,
    name: "Балитл",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Earth],
    home_abilities: [{ id: HomeAbilityIds.Earth, level: 1 }, { id: HomeAbilityIds.Hauling, level: 1 }],
  },
  {
    no: AniimoNos.Baleetle,
    name: "Балитл",
    form_id: FormIds.Snowfield,
    element_ids: [ElementIds.Earth, ElementIds.Ice],
    home_abilities: [
      { id: HomeAbilityIds.Earth, level: 1 },
      { id: HomeAbilityIds.Ice, level: 1 },
      { id: HomeAbilityIds.Hauling, level: 1 },
    ],
  },
  // --- 057 - Валитл ---
  {
    no: AniimoNos.Waleetle,
    name: "Валитл",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Earth],
    home_abilities: [{ id: HomeAbilityIds.Earth, level: 3 }, { id: HomeAbilityIds.Hauling, level: 3 }],
  },
  {
    no: AniimoNos.Waleetle,
    name: "Валитл",
    form_id: FormIds.Snowfield,
    element_ids: [ElementIds.Earth, ElementIds.Ice],
    home_abilities: [
      { id: HomeAbilityIds.Earth, level: 3 },
      { id: HomeAbilityIds.Ice, level: 2 },
      { id: HomeAbilityIds.Hauling, level: 3 },
    ],
  },
  {
    no: AniimoNos.Waleetle,
    name: "Валитл",
    form_id: FormIds.Prismana,
    element_ids: [ElementIds.Earth, ElementIds.Dark],
    home_abilities: [
      { id: HomeAbilityIds.Earth, level: 4 },
      { id: HomeAbilityIds.Dark, level: 3 },
      { id: HomeAbilityIds.Hauling, level: 4 },
    ],
  },
  // --- 058 - Камнюс ---
  {
    no: AniimoNos.Bouldus,
    name: "Камнюс",
    form_id: FormIds.Base,
    element_ids: [ElementIds.Earth],
    home_abilities: [{ id: HomeAbilityIds.Earth, level: 3 }, { id: HomeAbilityIds.Hauling, level: 3 }],
  },
  {
    no: AniimoNos.Bouldus,
    name: "Камнюс",
    form_id: FormIds.Snowfield,
    element_ids: [ElementIds.Earth, ElementIds.Ice],
    home_abilities: [
      { id: HomeAbilityIds.Earth, level: 3 },
      { id: HomeAbilityIds.Ice, level: 2 },
      { id: HomeAbilityIds.Hauling, level: 3 },
    ],
  },
];
