import { type AniimoRef, Aniimos } from './aniimos.refs.ts'
import { ElementIds } from "../src/enums/elements.ts";
import { type FormId, FormIds } from "../src/enums/forms.ts";
import { HomelandAbilityIds } from "../src/enums/homeland-abilities.ts";
import { type RegionId } from '../src/enums/regions.ts'
import type { ElementAssignment, HomelandAbilityAssignment } from "../src/types/aniimo.ts";
import type { PartialPersonality } from '../src/types/personality.ts'

export interface AniimoFormSource {
  aniimo: AniimoRef;
  form: FormId;
  region?: RegionId;
  elements: ElementAssignment[];
  home_abilities: HomelandAbilityAssignment[];
  fixed_personality?: PartialPersonality;
  season?: number;
  image?: string;
}

export const aniimos: AniimoFormSource[] = [
  /* ─── 001 - Искрокус ─── */
  {
    aniimo: Aniimos.Emberpup,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Emberpup,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Fire, level: 1 }, { id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Emberpup,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Fire, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  /* ─── 002 - Пламешерст ─── */
  {
    aniimo: Aniimos.Flameruff,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Flameruff,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Fire, level: 2 }, { id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Flameruff,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Fire, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  /* ─── 003 - Волкожог ─── */
  {
    aniimo: Aniimos.Scorchhowl,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Scorchhowl,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Fire, level: 3 }, { id: ElementIds.Earth, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Scorchhowl,
    form: FormIds.Thunderstorm,
    elements: [{ id: ElementIds.Fire, level: 3 }, { id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Scorchhowl,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Fire, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
  },
  {
    aniimo: Aniimos.Scorchhowl,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 004 - Пламеклык ───
  {
    aniimo: Aniimos.Inferlupa,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Fire, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Inferlupa,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }, { id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
    season: 1,
  },
  // ─── 005 - Селестис ───
  {
    aniimo: Aniimos.Celestis,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 006 - Стелларис ───
  {
    aniimo: Aniimos.Stellarys,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Stellarys,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Stellarys,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }, { id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  // ─── 007 - Чайкуша ───
  { aniimo: Aniimos.Chirpi, form: FormIds.Basic, elements: [{ id: ElementIds.Wind, level: 1 }], home_abilities: [] },
  {
    aniimo: Aniimos.Chirpi,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Water, level: 1 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Chirpi,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [],
  },
  // ─── 008 - Кликуша ───
  { aniimo: Aniimos.Tromber, form: FormIds.Basic, elements: [{ id: ElementIds.Wind, level: 3 }], home_abilities: [] },
  {
    aniimo: Aniimos.Tromber,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Tromber,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [],
  },
  // ─── 009 - Крикуша ───
  { aniimo: Aniimos.Cornet, form: FormIds.Basic, elements: [{ id: ElementIds.Wind, level: 3 }], home_abilities: [] },
  {
    aniimo: Aniimos.Cornet,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Cornet,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Wind, level: 4 }, { id: ElementIds.Lightning, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Cornet,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [],
  },
  // ─── 010 - Каркуша ───
  { aniimo: Aniimos.Tubster, form: FormIds.Basic, elements: [{ id: ElementIds.Wind, level: 3 }], home_abilities: [] },
  {
    aniimo: Aniimos.Tubster,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Tubster,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [],
  },
  // ─── 011 - Ирис ───
  {
    aniimo: Aniimos.Iris,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    form: FormIds.Forest,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    form: FormIds.Grassland,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    form: FormIds.Plateau,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 012 - Ирисаль ───
  {
    aniimo: Aniimos.Irisal,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Irisal,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Irisal,
    form: FormIds.Forest,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Irisal,
    form: FormIds.Grassland,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Irisal,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  {
    aniimo: Aniimos.Irisal,
    form: FormIds.Plateau,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Irisal,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  // ─── 013 - Шустрик ───
  {
    aniimo: Aniimos.Skippy,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Skippy,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Skippy,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Water, level: 1 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 014 - Шутник ───
  {
    aniimo: Aniimos.Pranky,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Pranky,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Pranky,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Water, level: 2 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  // ─── 015 - Морозница ───
  {
    aniimo: Aniimos.Glacy,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Glacy,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Glacy,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Glacy,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
  },
  // ─── 016 - Листик ───
  {
    aniimo: Aniimos.Leafy,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 017 - Пушинка ───
  {
    aniimo: Aniimos.Nimbi,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Nimbi,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Lightning, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Nimbi,
    form: FormIds.Cloudmist,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Nimbi,
    form: FormIds.Plateau,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 018 - Турбо ───
  {
    aniimo: Aniimos.Turbo,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Turbo,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Turbo,
    form: FormIds.Cloudmist,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Turbo,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Wind, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  {
    aniimo: Aniimos.Turbo,
    form: FormIds.Plateau,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  // ─── 019 - Дрипл ───
  {
    aniimo: Aniimos.Dreaple,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  // ─── 020 - Бормотун ───
  { aniimo: Aniimos.Hummin, form: FormIds.Basic, elements: [{ id: ElementIds.Grass, level: 1 }], home_abilities: [] },
  {
    aniimo: Aniimos.Hummin,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [],
  },
  // ─── 021 - Ведунья ───
  {
    aniimo: Aniimos.Hexxin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 2 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 2 }],
  },
  {
    aniimo: Aniimos.Hexxin,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Dark, level: 2 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 2 }],
  },
  {
    aniimo: Aniimos.Hexxin,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }, { id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  // ─── 022 - Топотун ───
  {
    aniimo: Aniimos.Tuckin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Tuckin,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Earth, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 023 - Цветохват ───
  {
    aniimo: Aniimos.Budclaw,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Budclaw,
    form: FormIds.Mudflat,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Budclaw,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Budclaw,
    form: FormIds.Bay,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 024 - Кустохват ───
  {
    aniimo: Aniimos.Shrubclaw,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Shrubclaw,
    form: FormIds.Mudflat,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Shrubclaw,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Shrubclaw,
    form: FormIds.Bay,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 025 - Кристаллохват ───
  {
    aniimo: Aniimos.Geoclaw,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
    fixed_personality: { TF: "T" },
  },
  // ─── 026 - Искорка ───
  { aniimo: Aniimos.Sparki, form: FormIds.Basic, elements: [{ id: ElementIds.Fire, level: 2 }], home_abilities: [] },
  { aniimo: Aniimos.Sparki, form: FormIds.Highland, elements: [{ id: ElementIds.Fire, level: 2 }], home_abilities: [] },
  { aniimo: Aniimos.Sparki, form: FormIds.Forest, elements: [{ id: ElementIds.Fire, level: 2 }], home_abilities: [] },
  {
    aniimo: Aniimos.Sparki,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Fire, level: 2 }],
    home_abilities: [],
  },
  // ─── 027 - Пламерион ───
  { aniimo: Aniimos.Flamerion, form: FormIds.Basic, elements: [{ id: ElementIds.Fire, level: 3 }], home_abilities: [] },
  {
    aniimo: Aniimos.Flamerion,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Flamerion,
    form: FormIds.Forest,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Flamerion,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [],
  },
  // ─── 028 - Бояка ───
  {
    aniimo: Aniimos.Flutternym,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Flutternym,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Flutternym,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Flutternym,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 029 - Миражекрыл ───
  {
    aniimo: Aniimos.Gracewing,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Gracewing,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Gracewing,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Dark, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Gracewing,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Earth, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  // ─── 030 - Снокрыл ───
  {
    aniimo: Aniimos.Somniwing,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }, { id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  // ─── 031 - Эко ───
  {
    aniimo: Aniimos.Eko,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 032 - Эклу ───
  {
    aniimo: Aniimos.Eklue,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 033 - Бутоносец ───
  {
    aniimo: Aniimos.Budsquire,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Budsquire,
    form: FormIds.Towerwood,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 034 - Шпагошип ───
  {
    aniimo: Aniimos.Thornblade,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Thornblade,
    form: FormIds.Thunderstorm,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Thornblade,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }, { id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  {
    aniimo: Aniimos.Thornblade,
    form: FormIds.Towerwood,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 035 - Мироцвет ───
  {
    aniimo: Aniimos.Melloblum,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
    fixed_personality: { TF: "F" },
  },
  {
    aniimo: Aniimos.Melloblum,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
    fixed_personality: { TF: "F" },
    season: 1,
  },
  // ─── 036 - Чирлимон ───
  {
    aniimo: Aniimos.Pomegg,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Pomegg,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Grass, level: 1 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Pomegg,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Pomegg,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 037 - Помагавк ───
  {
    aniimo: Aniimos.Pomawk,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Pomawk,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Pomawk,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Pomawk,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 038 - Отдушечка ───
  {
    aniimo: Aniimos.Dewy,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }, { id: HomelandAbilityIds.Perfumery, level: 1 }],
  },
  // ─── 039 - Фрагрансье ───
  {
    aniimo: Aniimos.Fragrancier,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }, { id: HomelandAbilityIds.Perfumery, level: 3 }],
  },
  // ─── 040 - Когтис ───
  {
    aniimo: Aniimos.Wisptis,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Wisptis,
    form: FormIds.Forest,
    elements: [{ id: ElementIds.Dark, level: 1 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Wisptis,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Dark, level: 1 }, { id: ElementIds.Fire, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 041 - Игнитис ───
  {
    aniimo: Aniimos.Ignitis,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Ignitis,
    form: FormIds.Forest,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Ignitis,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }, { id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  {
    aniimo: Aniimos.Ignitis,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Fire, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 042 - Костесвод ───
  {
    aniimo: Aniimos.Bonesky,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Bonesky,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Ice, level: 1 }, { id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 043 - Фенрир ───
  {
    aniimo: Aniimos.Fenrier,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Fenrier,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Ice, level: 2 }, { id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  // ─── 044 - Глинсера ───
  {
    aniimo: Aniimos.Glynsera,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Glynsera,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Ice, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
    season: 1,
  },
  {
    aniimo: Aniimos.Glynsera,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Ice, level: 3 }, { id: ElementIds.Dark, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 045 - Вольт ───
  {
    aniimo: Aniimos.Bolty,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Bolty,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Lightning, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 046 - Разряд ───
  {
    aniimo: Aniimos.Blazen,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Blazen,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Lightning, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  {
    aniimo: Aniimos.Blazen,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 047 - Белкулак ───
  {
    aniimo: Aniimos.Squarrel,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 048 - Хвостобой ───
  {
    aniimo: Aniimos.Squashel,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 2 }],
  },
  // ─── 049 - Стесняша ───
  {
    aniimo: Aniimos.Susuta,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Susuta,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 050 - Ныряша ───
  {
    aniimo: Aniimos.Popota,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 2 }],
  },
  {
    aniimo: Aniimos.Popota,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 2 }],
  },
  // ─── 051 - Нимфея ───
  {
    aniimo: Aniimos.Piopiota,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Piopiota,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Dark, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
    fixed_personality: { EI: "E", JP: "P" },
  },
  // ─── 052 - Пухлея ───
  {
    aniimo: Aniimos.Panpanta,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Panpanta,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
    fixed_personality: { EI: "I", JP: "J" },
  },
  {
    aniimo: Aniimos.Panpanta,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  // ─── 053 - Шелли ───
  {
    aniimo: Aniimos.Shelly,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 054 - Шелдон ───
  {
    aniimo: Aniimos.Sheldon,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 2 }],
  },
  // ─── 055 - Шерро ───
  {
    aniimo: Aniimos.Sherro,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Sherro,
    form: FormIds.Thunderstorm,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Sherro,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  // ─── 056 - Балитл ───
  {
    aniimo: Aniimos.Baleetle,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Baleetle,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Earth, level: 1 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 057 - Валитл ───
  {
    aniimo: Aniimos.Waleetle,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Waleetle,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Earth, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Waleetle,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Earth, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
    season: 1,
  },
  // ─── 058 - Камнюс ───
  {
    aniimo: Aniimos.Bouldus,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Bouldus,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Earth, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 059 - Фентуфт ───
  {
    aniimo: Aniimos.Fentuft,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 060 - Фенмейн ───
  {
    aniimo: Aniimos.Fenmane,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Fenmane,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Lightning, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }, { id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  // ─── 061 - Шлемут ───
  {
    aniimo: Aniimos.Helmut,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Helmut,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Dark, level: 1 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Helmut,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 062 - Крутут ───
  {
    aniimo: Aniimos.Pawney,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Pawney,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Pawney,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Pawney,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
  },
  // ─── 063 - Робкут ───
  {
    aniimo: Aniimos.Rookey,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Rookey,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Rookey,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 064 - Кусинг ───
  {
    aniimo: Aniimos.Jawling,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Jawling,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 065 - Шлеминг ───
  {
    aniimo: Aniimos.Helmwhelp,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Helmwhelp,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Wind, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  // ─── 066 - Бронинг ───
  {
    aniimo: Aniimos.Helgon,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Helgon,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 067 - Горнинг ───
  {
    aniimo: Aniimos.Infergon,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Infergon,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Fire, level: 4 }, { id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
    season: 1,
  },
  // ─── 068 - Медвежик ───
  {
    aniimo: Aniimos.Cubbo,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 069 - Грызля ───
  {
    aniimo: Aniimos.Grizbo,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Grizbo,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Earth, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
  },
  // ─── 070 - Камешек ───
  {
    aniimo: Aniimos.Pebbling,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 071 - Лавазар ───
  {
    aniimo: Aniimos.Lavazar,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 2 }, { id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  // ─── 072 - Магмарекс ───
  {
    aniimo: Aniimos.Magmarex,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 3 }, { id: ElementIds.Earth, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Magmarex,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Fire, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
  },
  // ─── 073 - Камнеспин ───
  {
    aniimo: Aniimos.Geodeback,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  // ─── 074 - Шахтоспин ───
  {
    aniimo: Aniimos.Minespine,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 075 - Уютнит ───
  {
    aniimo: Aniimos.Cozite,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 076 - Байлит ───
  {
    aniimo: Aniimos.Bailite,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 077 - Лампадка ───
  {
    aniimo: Aniimos.Bulbly,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 078 - Лучина ───
  {
    aniimo: Aniimos.Veilfloat,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 2 }],
  },
  // ─── 079 - Сияша ───
  {
    aniimo: Aniimos.Luminelle,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Luminelle,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Lightning, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Luminelle,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Lightning, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  // ─── 080 - Фалу ───
  { aniimo: Aniimos.Fahloo, form: FormIds.Basic, elements: [{ id: ElementIds.Water, level: 1 }], home_abilities: [] },
  // ─── 081 - Эрлат ───
  { aniimo: Aniimos.Erlath, form: FormIds.Basic, elements: [{ id: ElementIds.Water, level: 3 }], home_abilities: [] },
  // ─── 082 - Ритмос ───
  {
    aniimo: Aniimos.Besauce,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },

  // ─── 001 - Рифиш ───
  {
    aniimo: Aniimos.Reefish,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }, { id: ElementIds.Water, level: 1 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Reefish,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [],
  },
  // ─── 002 - Коралис ───
  {
    aniimo: Aniimos.Coraliz,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Coraliz,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 003 - Гипносыч ───
  {
    aniimo: Aniimos.Hypnowl,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 004 - Гипноу ───
  {
    aniimo: Aniimos.Mesmerowl,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 005 - Росинка ───
  {
    aniimo: Aniimos.Dewlop,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Dewlop,
    form: FormIds.Waterfall,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 006 - Капелька ───
  {
    aniimo: Aniimos.Dewple,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Dewple,
    form: FormIds.Waterfall,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 007 - Монетгейст ───
  {
    aniimo: Aniimos.Coinwisp,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 008 - Кошмарик ───
  {
    aniimo: Aniimos.Pouchwisp,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Pouchwisp,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
    season: 1,
  },
  // ─── 009 - Листовечка ───
  {
    aniimo: Aniimos.Bubbeep,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 1 }, { id: ElementIds.Water, level: 1 }],
    home_abilities: [],
  },
  // ─── 010 - Милашечка ───
  {
    aniimo: Aniimos.Glameep,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Glameep,
    form: FormIds.Tempest,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Wind, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Glameep,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [],
    season: 1,
  },
  // ─── 011 - Шарикус ───
  {
    aniimo: Aniimos.Popapus,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 012 - Гачапус ───
  {
    aniimo: Aniimos.Gachapus,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Gachapus,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  // ─── 013 - Сахарок ───
  {
    aniimo: Aniimos.Sugarfish,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }, { id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 014 - Сладкоежка ───
  {
    aniimo: Aniimos.Sugarslime,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }, { id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  // ─── 015 - Сластена ───
  {
    aniimo: Aniimos.Sugartini,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }, { id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Sugartini,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Ice, level: 4 }, { id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }, { id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  // ─── 016 - Кувшинчик ───
  { aniimo: Aniimos.Lilipole, form: FormIds.Basic, elements: [{ id: ElementIds.Water, level: 1 }], home_abilities: [] },
  // ─── 017 - Лялия ───
  { aniimo: Aniimos.Scrubbit, form: FormIds.Basic, elements: [{ id: ElementIds.Water, level: 3 }], home_abilities: [] },
  {
    aniimo: Aniimos.Scrubbit,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [],
  },
  // ─── 018 - Крокоступ ───
  {
    aniimo: Aniimos.Salabask,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 1 }, { id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 019 - Крокоряга ───
  {
    aniimo: Aniimos.Crocobask,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 020 - Пыльценосец ───
  { aniimo: Aniimos.Puffby, form: FormIds.Basic, elements: [{ id: ElementIds.Wind, level: 1 }], home_abilities: [] },
  // ─── 021 - Шмелевяк ───
  { aniimo: Aniimos.Buffby, form: FormIds.Basic, elements: [{ id: ElementIds.Wind, level: 3 }], home_abilities: [] },
  // ─── 022 - Пчелонарх ───
  { aniimo: Aniimos.Royalby, form: FormIds.Basic, elements: [{ id: ElementIds.Wind, level: 3 }], home_abilities: [] },
  {
    aniimo: Aniimos.Royalby,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Wind, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
    season: 1,
  },
  // ─── 023 - Пилорыб ───
  {
    aniimo: Aniimos.Saws,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 024 - Кругокусь ───
  {
    aniimo: Aniimos.Whirlbite,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Whirlbite,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [],
  },
  // ─── 025 - Задирак ───
  {
    aniimo: Aniimos.Prawnch,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 026 - Джебстер ───
  {
    aniimo: Aniimos.Jabster,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }, { id: ElementIds.Dark, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Jabster,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Ice, level: 4 }, { id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  {
    aniimo: Aniimos.Jabster,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Ice, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 027 - Волнорез ───
  {
    aniimo: Aniimos.Jeglid,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Jeglid,
    form: FormIds.Tempest,
    elements: [{ id: ElementIds.Water, level: 1 }, { id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 028 - Волнопрыск ───
  {
    aniimo: Aniimos.Jeburst,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Jeburst,
    form: FormIds.Tempest,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Wind, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Jeburst,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
    season: 1,
  },
  // ─── 029 - Экрим ───
  {
    aniimo: Aniimos.Ekrim,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Ekrim,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }, { id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },

  // ─── 10001 - Ирисалис ───
  {
    aniimo: Aniimos.Irisalis,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
    season: 1,
  },
  // ─── 10002 - Танцомон ───
  {
    aniimo: Aniimos.Dazmand,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
    season: 1,
  },
  // ─── 10003 - Фульминтис ───
  {
    aniimo: Aniimos.Fulmintis,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
    season: 1,
  },
  {
    aniimo: Aniimos.Fulmintis,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Lightning, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
    season: 1,
  },
  // ─── 10004 - Молнепрыг ───
  {
    aniimo: Aniimos.Hoptail,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
    season: 1,
  },
  // ─── 10006 - Гипнокрыл ───
  {
    aniimo: Aniimos.Hypnyto,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
    season: 1,
  },
  {
    aniimo: Aniimos.Hypnyto,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Wind, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [],
    season: 1,
  },
  // ─── 10007 - Грозопард ───
  {
    aniimo: Aniimos.Jaguaraun,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
    season: 1,
  },
  // ─── 11001 - Дух дружбы ───
  {
    aniimo: Aniimos.Sparkelf,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [],
    season: 1,
  },
  {
    aniimo: Aniimos.Sparkelf,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Fire, level: 4 }],
    home_abilities: [],
    season: 1,
  },

  // ─── 99996 - Лунара ───
  {
    aniimo: Aniimos.Lunara,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
    fixed_personality: { EI: "I", SN: "S", TF: "T", JP: "J" },
  },
  // ─── 99998 - Гелион ───
  {
    aniimo: Aniimos.Helion,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
    fixed_personality: { EI: "E", SN: "N", TF: "F", JP: "P" },
  },
];
