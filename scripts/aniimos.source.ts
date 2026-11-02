import { type AniimoRef, Aniimos } from './aniimos.refs.ts'
import { ElementIds } from "../src/enums/elements.ts";
import { type FormId, FormIds } from "../src/enums/forms.ts";
import { HomelandAbilityIds } from "../src/enums/homeland-abilities.ts";
import { type RegionId } from '../src/enums/regions.ts'
import { type StageId, StageIds } from '../src/enums/stages.ts'
import type { ElementAssignment, HomelandAbilityAssignment } from "../src/types/aniimo.ts";
import type { PartialPersonality } from '../src/types/personality.ts'

export interface AniimoFormSource {
  aniimo: AniimoRef;
  stage?: StageId;
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
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Emberpup,
    stage: StageIds.Lumin,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Fire, level: 1 }, { id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Emberpup,
    stage: StageIds.Lumin,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Fire, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  /* ─── 002 - Пламешерст ─── */
  {
    aniimo: Aniimos.Flameruff,
    stage: StageIds.Gamma,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Flameruff,
    stage: StageIds.Gamma,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Fire, level: 2 }, { id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Flameruff,
    stage: StageIds.Gamma,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Fire, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  /* ─── 003 - Волкожог ─── */
  {
    aniimo: Aniimos.Scorchhowl,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Scorchhowl,
    stage: StageIds.Nova,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Fire, level: 3 }, { id: ElementIds.Earth, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Scorchhowl,
    stage: StageIds.Nova,
    form: FormIds.Thunderstorm,
    elements: [{ id: ElementIds.Fire, level: 3 }, { id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Scorchhowl,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Fire, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
  },
  {
    aniimo: Aniimos.Scorchhowl,
    stage: StageIds.Nova,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 004 - Пламеклык ───
  {
    aniimo: Aniimos.Inferlupa,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Fire, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Inferlupa,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }, { id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
    season: 1,
  },
  // ─── 005 - Селестис ───
  {
    aniimo: Aniimos.Celestis,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 006 - Стелларис ───
  {
    aniimo: Aniimos.Stellarys,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Stellarys,
    stage: StageIds.Nova,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Stellarys,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }, { id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  // ─── 007 - Чайкуша ───
  {
    aniimo: Aniimos.Chirpi,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Chirpi,
    stage: StageIds.Lumin,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Water, level: 1 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Chirpi,
    stage: StageIds.Lumin,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [],
  },
  // ─── 008 - Кликуша ───
  {
    aniimo: Aniimos.Tromber,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Tromber,
    stage: StageIds.Nova,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Tromber,
    stage: StageIds.Nova,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [],
  },
  // ─── 009 - Крикуша ───
  {
    aniimo: Aniimos.Cornet,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Cornet,
    stage: StageIds.Nova,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Cornet,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Wind, level: 4 }, { id: ElementIds.Lightning, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Cornet,
    stage: StageIds.Nova,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [],
  },
  // ─── 010 - Каркуша ───
  {
    aniimo: Aniimos.Tubster,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Tubster,
    stage: StageIds.Nova,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Tubster,
    stage: StageIds.Nova,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [],
  },
  // ─── 011 - Ирис ───
  {
    aniimo: Aniimos.Iris,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    stage: StageIds.Lumin,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    stage: StageIds.Lumin,
    form: FormIds.Forest,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    stage: StageIds.Lumin,
    form: FormIds.Grassland,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    stage: StageIds.Lumin,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    stage: StageIds.Lumin,
    form: FormIds.Plateau,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Iris,
    stage: StageIds.Lumin,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 012 - Ирисаль ───
  {
    aniimo: Aniimos.Irisal,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Irisal,
    stage: StageIds.Nova,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Irisal,
    stage: StageIds.Nova,
    form: FormIds.Forest,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Irisal,
    stage: StageIds.Nova,
    form: FormIds.Grassland,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Irisal,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  {
    aniimo: Aniimos.Irisal,
    stage: StageIds.Nova,
    form: FormIds.Plateau,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Irisal,
    stage: StageIds.Nova,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  // ─── 013 - Шустрик ───
  {
    aniimo: Aniimos.Skippy,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Skippy,
    stage: StageIds.Lumin,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Skippy,
    stage: StageIds.Lumin,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Water, level: 1 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 014 - Шутник ───
  {
    aniimo: Aniimos.Pranky,
    stage: StageIds.Gamma,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Pranky,
    stage: StageIds.Gamma,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Pranky,
    stage: StageIds.Gamma,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Water, level: 2 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  // ─── 015 - Морозница ───
  {
    aniimo: Aniimos.Glacy,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Glacy,
    stage: StageIds.Nova,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Glacy,
    stage: StageIds.Nova,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Glacy,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
  },
  // ─── 016 - Листик ───
  {
    aniimo: Aniimos.Leafy,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 017 - Пушинка ───
  {
    aniimo: Aniimos.Nimbi,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Nimbi,
    stage: StageIds.Lumin,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Lightning, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Nimbi,
    stage: StageIds.Lumin,
    form: FormIds.Cloudmist,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Nimbi,
    stage: StageIds.Lumin,
    form: FormIds.Plateau,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 018 - Турбо ───
  {
    aniimo: Aniimos.Turbo,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Turbo,
    stage: StageIds.Nova,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Turbo,
    stage: StageIds.Nova,
    form: FormIds.Cloudmist,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Turbo,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Wind, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  {
    aniimo: Aniimos.Turbo,
    stage: StageIds.Nova,
    form: FormIds.Plateau,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  // ─── 019 - Дрипл ───
  {
    aniimo: Aniimos.Dreaple,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  // ─── 020 - Бормотун ───
  {
    aniimo: Aniimos.Hummin,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Hummin,
    stage: StageIds.Lumin,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [],
  },
  // ─── 021 - Ведьмун ───
  {
    aniimo: Aniimos.Hexxin,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 2 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 2 }],
  },
  {
    aniimo: Aniimos.Hexxin,
    stage: StageIds.Nova,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Dark, level: 2 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 2 }],
  },
  {
    aniimo: Aniimos.Hexxin,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }, { id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  // ─── 022 - Топотун ───
  {
    aniimo: Aniimos.Tuckin,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Tuckin,
    stage: StageIds.Nova,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Earth, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 023 - Цветохват ───
  {
    aniimo: Aniimos.Budclaw,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Budclaw,
    stage: StageIds.Lumin,
    form: FormIds.Mudflat,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Budclaw,
    stage: StageIds.Lumin,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Budclaw,
    stage: StageIds.Lumin,
    form: FormIds.Bay,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 024 - Кустохват ───
  {
    aniimo: Aniimos.Shrubclaw,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Shrubclaw,
    stage: StageIds.Nova,
    form: FormIds.Mudflat,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Shrubclaw,
    stage: StageIds.Nova,
    form: FormIds.Beach,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Shrubclaw,
    stage: StageIds.Nova,
    form: FormIds.Bay,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 025 - Кристаллохват ───
  {
    aniimo: Aniimos.Geoclaw,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
    fixed_personality: { TF: "T" },
  },
  // ─── 026 - Искорка ───
  {
    aniimo: Aniimos.Sparki,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Sparki,
    stage: StageIds.Lumin,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Fire, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Sparki,
    stage: StageIds.Lumin,
    form: FormIds.Forest,
    elements: [{ id: ElementIds.Fire, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Sparki,
    stage: StageIds.Lumin,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Fire, level: 2 }],
    home_abilities: [],
  },
  // ─── 027 - Пламерион ───
  {
    aniimo: Aniimos.Flamerion,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Flamerion,
    stage: StageIds.Nova,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Flamerion,
    stage: StageIds.Nova,
    form: FormIds.Forest,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Flamerion,
    stage: StageIds.Nova,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [],
  },
  // ─── 028 - Бояка ───
  {
    aniimo: Aniimos.Flutternym,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Flutternym,
    stage: StageIds.Lumin,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Flutternym,
    stage: StageIds.Lumin,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Flutternym,
    stage: StageIds.Lumin,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Wind, level: 1 }, { id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 029 - Миражекрыл ───
  {
    aniimo: Aniimos.Gracewing,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Gracewing,
    stage: StageIds.Nova,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Gracewing,
    stage: StageIds.Nova,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Dark, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Gracewing,
    stage: StageIds.Nova,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Earth, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  // ─── 030 - Снокрыл ───
  {
    aniimo: Aniimos.Somniwing,
    stage: StageIds.Legendary,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }, { id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  // ─── 031 - Эко ───
  {
    aniimo: Aniimos.Eko,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 032 - Эклу ───
  {
    aniimo: Aniimos.Eklue,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 033 - Бутоносец ───
  {
    aniimo: Aniimos.Budsquire,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Budsquire,
    stage: StageIds.Lumin,
    form: FormIds.Towerwood,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 034 - Шпагошип ───
  {
    aniimo: Aniimos.Thornblade,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Thornblade,
    stage: StageIds.Nova,
    form: FormIds.Thunderstorm,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Thornblade,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }, { id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  {
    aniimo: Aniimos.Thornblade,
    stage: StageIds.Nova,
    form: FormIds.Towerwood,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 035 - Мироцвет ───
  {
    aniimo: Aniimos.Melloblum,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
    fixed_personality: { TF: "F" },
  },
  {
    aniimo: Aniimos.Melloblum,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
    fixed_personality: { TF: "F" },
    season: 1,
  },
  // ─── 036 - Чирлимон ───
  {
    aniimo: Aniimos.Pomegg,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Pomegg,
    stage: StageIds.Lumin,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Grass, level: 1 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Pomegg,
    stage: StageIds.Lumin,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Pomegg,
    stage: StageIds.Lumin,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 037 - Помагавк ───
  {
    aniimo: Aniimos.Pomawk,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Pomawk,
    stage: StageIds.Nova,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Pomawk,
    stage: StageIds.Nova,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Pomawk,
    stage: StageIds.Nova,
    form: FormIds.Flowerfield,
    elements: [{ id: ElementIds.Grass, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 038 - Отдушечка ───
  {
    aniimo: Aniimos.Dewy,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }, { id: HomelandAbilityIds.Perfumery, level: 1 }],
  },
  // ─── 039 - Фрагрансье ───
  {
    aniimo: Aniimos.Fragrancier,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }, { id: HomelandAbilityIds.Perfumery, level: 3 }],
  },
  // ─── 040 - Когтис ───
  {
    aniimo: Aniimos.Wisptis,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Wisptis,
    stage: StageIds.Lumin,
    form: FormIds.Forest,
    elements: [{ id: ElementIds.Dark, level: 1 }, { id: ElementIds.Grass, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Wisptis,
    stage: StageIds.Lumin,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Dark, level: 1 }, { id: ElementIds.Fire, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 041 - Игнитис ───
  {
    aniimo: Aniimos.Ignitis,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Ignitis,
    stage: StageIds.Nova,
    form: FormIds.Forest,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Grass, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Ignitis,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }, { id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  {
    aniimo: Aniimos.Ignitis,
    stage: StageIds.Nova,
    form: FormIds.Highland,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Fire, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 042 - Костесвод ───
  {
    aniimo: Aniimos.Bonesky,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Bonesky,
    stage: StageIds.Lumin,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Ice, level: 1 }, { id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 043 - Фенрир ───
  {
    aniimo: Aniimos.Fenrier,
    stage: StageIds.Gamma,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Fenrier,
    stage: StageIds.Gamma,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Ice, level: 2 }, { id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  // ─── 044 - Глинсера ───
  {
    aniimo: Aniimos.Glynsera,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Glynsera,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Ice, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
    season: 1,
  },
  {
    aniimo: Aniimos.Glynsera,
    stage: StageIds.Nova,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Ice, level: 3 }, { id: ElementIds.Dark, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 045 - Вольт ───
  {
    aniimo: Aniimos.Bolty,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  {
    aniimo: Aniimos.Bolty,
    stage: StageIds.Lumin,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Lightning, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 046 - Разряд ───
  {
    aniimo: Aniimos.Blazen,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Blazen,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Lightning, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  {
    aniimo: Aniimos.Blazen,
    stage: StageIds.Nova,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 047 - Белкулак ───
  {
    aniimo: Aniimos.Squarrel,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 048 - Хвостобой ───
  {
    aniimo: Aniimos.Squashel,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 2 }],
  },
  // ─── 049 - Стесняша ───
  {
    aniimo: Aniimos.Susuta,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  {
    aniimo: Aniimos.Susuta,
    stage: StageIds.Lumin,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 050 - Ныряша ───
  {
    aniimo: Aniimos.Popota,
    stage: StageIds.Gamma,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 2 }],
  },
  {
    aniimo: Aniimos.Popota,
    stage: StageIds.Gamma,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 2 }],
  },
  // ─── 051 - Нимфея ───
  {
    aniimo: Aniimos.Piopiota,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Piopiota,
    stage: StageIds.Nova,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Dark, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
    fixed_personality: { EI: "E", JP: "P" },
  },
  // ─── 052 - Пухлея ───
  {
    aniimo: Aniimos.Panpanta,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Panpanta,
    stage: StageIds.Nova,
    form: FormIds.Nighttime,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
    fixed_personality: { EI: "I", JP: "J" },
  },
  {
    aniimo: Aniimos.Panpanta,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  // ─── 053 - Шелли ───
  {
    aniimo: Aniimos.Shelly,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 054 - Шелдон ───
  {
    aniimo: Aniimos.Sheldon,
    stage: StageIds.Gamma,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 2 }],
  },
  // ─── 055 - Шерро ───
  {
    aniimo: Aniimos.Sherro,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Sherro,
    stage: StageIds.Nova,
    form: FormIds.Thunderstorm,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Sherro,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  // ─── 056 - Балитл ───
  {
    aniimo: Aniimos.Baleetle,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Baleetle,
    stage: StageIds.Lumin,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Earth, level: 1 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 057 - Валитл ───
  {
    aniimo: Aniimos.Waleetle,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Waleetle,
    stage: StageIds.Nova,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Earth, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Waleetle,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Earth, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
    season: 1,
  },
  // ─── 058 - Камнюс ───
  {
    aniimo: Aniimos.Bouldus,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Bouldus,
    stage: StageIds.Nova,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Earth, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 059 - Фентуфт ───
  {
    aniimo: Aniimos.Fentuft,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 060 - Фенмейн ───
  {
    aniimo: Aniimos.Fenmane,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Fenmane,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Lightning, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }, { id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  // ─── 061 - Шлемут ───
  {
    aniimo: Aniimos.Helmut,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Helmut,
    stage: StageIds.Lumin,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Dark, level: 1 }, { id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Helmut,
    stage: StageIds.Lumin,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 062 - Крутут ───
  {
    aniimo: Aniimos.Pawney,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Pawney,
    stage: StageIds.Nova,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Pawney,
    stage: StageIds.Nova,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Pawney,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
  },
  // ─── 063 - Робкут ───
  {
    aniimo: Aniimos.Rookey,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Rookey,
    stage: StageIds.Nova,
    form: FormIds.Snowfield,
    elements: [{ id: ElementIds.Dark, level: 3 }, { id: ElementIds.Ice, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Rookey,
    stage: StageIds.Nova,
    form: FormIds.MountainWoods,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 064 - Кусинг ───
  {
    aniimo: Aniimos.Jawling,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Jawling,
    stage: StageIds.Lumin,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 065 - Шлеминг ───
  {
    aniimo: Aniimos.Helmwhelp,
    stage: StageIds.Gamma,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  {
    aniimo: Aniimos.Helmwhelp,
    stage: StageIds.Gamma,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Wind, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  // ─── 066 - Бронинг ───
  {
    aniimo: Aniimos.Helgon,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Helgon,
    stage: StageIds.Nova,
    form: FormIds.Mountain,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 067 - Горнинг ───
  {
    aniimo: Aniimos.Infergon,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Infergon,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Fire, level: 4 }, { id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
    season: 1,
  },
  // ─── 068 - Медвежик ───
  {
    aniimo: Aniimos.Cubbo,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 069 - Грызля ───
  {
    aniimo: Aniimos.Grizbo,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Grizbo,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Earth, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
  },
  // ─── 070 - Камешек ───
  {
    aniimo: Aniimos.Pebbling,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 071 - Лавазар ───
  {
    aniimo: Aniimos.Lavazar,
    stage: StageIds.Gamma,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 2 }, { id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  // ─── 072 - Магмарекс ───
  {
    aniimo: Aniimos.Magmarex,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 3 }, { id: ElementIds.Earth, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Magmarex,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Fire, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
  },
  // ─── 073 - Камнеспин ───
  {
    aniimo: Aniimos.Geodeback,
    stage: StageIds.Gamma,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 2 }],
  },
  // ─── 074 - Шахтоспин ───
  {
    aniimo: Aniimos.Minespine,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 075 - Уютнит ───
  {
    aniimo: Aniimos.Cozite,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 076 - Байлит ───
  {
    aniimo: Aniimos.Bailite,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 077 - Лампадка ───
  {
    aniimo: Aniimos.Bulbly,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 1 }],
  },
  // ─── 078 - Лучина ───
  {
    aniimo: Aniimos.Veilfloat,
    stage: StageIds.Gamma,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 2 }],
  },
  // ─── 079 - Сияша ───
  {
    aniimo: Aniimos.Luminelle,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Luminelle,
    stage: StageIds.Nova,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Lightning, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Luminelle,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Lightning, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  // ─── 080 - Фалу ───
  {
    aniimo: Aniimos.Fahloo,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [],
  },
  // ─── 081 - Эрлат ───
  {
    aniimo: Aniimos.Erlath,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [],
  },
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
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }, { id: ElementIds.Water, level: 1 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Reefish,
    stage: StageIds.Lumin,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [],
  },
  // ─── 002 - Коралис ───
  {
    aniimo: Aniimos.Coraliz,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Earth, level: 1 }, { id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Coraliz,
    stage: StageIds.Nova,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Earth, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 003 - Гипносыч ───
  {
    aniimo: Aniimos.Hypnowl,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 004 - Гипноу ───
  {
    aniimo: Aniimos.Mesmerowl,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 005 - Росинка ───
  {
    aniimo: Aniimos.Dewlop,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Dewlop,
    stage: StageIds.Lumin,
    form: FormIds.Waterfall,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 006 - Капелька ───
  {
    aniimo: Aniimos.Dewple,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Dewple,
    stage: StageIds.Nova,
    form: FormIds.Waterfall,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 007 - Монетгейст ───
  {
    aniimo: Aniimos.Coinwisp,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 008 - Кошмарик ───
  {
    aniimo: Aniimos.Pouchwisp,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Pouchwisp,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
    season: 1,
  },
  // ─── 009 - Листовечка ───
  {
    aniimo: Aniimos.Bubbeep,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 1 }, { id: ElementIds.Water, level: 1 }],
    home_abilities: [],
  },
  // ─── 010 - Милашечка ───
  {
    aniimo: Aniimos.Glameep,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Glameep,
    stage: StageIds.Nova,
    form: FormIds.Tempest,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Wind, level: 2 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Glameep,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [],
    season: 1,
  },
  // ─── 011 - Шарикус ───
  {
    aniimo: Aniimos.Popapus,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 012 - Гачапус ───
  {
    aniimo: Aniimos.Gachapus,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Gachapus,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  // ─── 013 - Сахарок ───
  {
    aniimo: Aniimos.Sugarfish,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }, { id: HomelandAbilityIds.Leisure, level: 1 }],
  },
  // ─── 014 - Сладкоежка ───
  {
    aniimo: Aniimos.Sugarslime,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }, { id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  // ─── 015 - Сластена ───
  {
    aniimo: Aniimos.Sugartini,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }, { id: HomelandAbilityIds.Leisure, level: 3 }],
  },
  {
    aniimo: Aniimos.Sugartini,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Ice, level: 4 }, { id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }, { id: HomelandAbilityIds.Leisure, level: 4 }],
  },
  // ─── 016 - Кувшинчик ───
  {
    aniimo: Aniimos.Lilipole,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [],
  },
  // ─── 017 - Лялия ───
  {
    aniimo: Aniimos.Scrubbit,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Scrubbit,
    stage: StageIds.Nova,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [],
  },
  // ─── 018 - Крокоступ ───
  {
    aniimo: Aniimos.Salabask,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 1 }, { id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 019 - Крокоряга ───
  {
    aniimo: Aniimos.Crocobask,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Grass, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  // ─── 020 - Пыльценосец ───
  {
    aniimo: Aniimos.Puffby,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 1 }],
    home_abilities: [],
  },
  // ─── 021 - Шмелевяк ───
  {
    aniimo: Aniimos.Buffby,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [],
  },
  // ─── 022 - Пчелонарх ───
  {
    aniimo: Aniimos.Royalby,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [],
  },
  {
    aniimo: Aniimos.Royalby,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Wind, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
    season: 1,
  },
  // ─── 023 - Пилорыб ───
  {
    aniimo: Aniimos.Saws,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 024 - Кругокусь ───
  {
    aniimo: Aniimos.Whirlbite,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Whirlbite,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [],
  },
  // ─── 025 - Задирак ───
  {
    aniimo: Aniimos.Prawnch,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 026 - Джебстер ───
  {
    aniimo: Aniimos.Jabster,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Ice, level: 3 }, { id: ElementIds.Dark, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Jabster,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Ice, level: 4 }, { id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },
  {
    aniimo: Aniimos.Jabster,
    stage: StageIds.Nova,
    form: FormIds.Rainfall,
    elements: [{ id: ElementIds.Ice, level: 3 }, { id: ElementIds.Water, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  // ─── 027 - Волнорез ───
  {
    aniimo: Aniimos.Jeglid,
    stage: StageIds.Lumin,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  {
    aniimo: Aniimos.Jeglid,
    stage: StageIds.Lumin,
    form: FormIds.Tempest,
    elements: [{ id: ElementIds.Water, level: 1 }, { id: ElementIds.Wind, level: 1 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 1 }],
  },
  // ─── 028 - Волнопрыск ───
  {
    aniimo: Aniimos.Jeburst,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Water, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Jeburst,
    stage: StageIds.Nova,
    form: FormIds.Tempest,
    elements: [{ id: ElementIds.Water, level: 3 }, { id: ElementIds.Wind, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
  },
  {
    aniimo: Aniimos.Jeburst,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Water, level: 4 }, { id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 4 }],
    season: 1,
  },
  // ─── 029 - Экрим ───
  {
    aniimo: Aniimos.Ekrim,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Dark, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
  },
  {
    aniimo: Aniimos.Ekrim,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Dark, level: 4 }, { id: ElementIds.Fire, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
  },

  // ─── 10001 - Ирисалис ───
  {
    aniimo: Aniimos.Irisalis,
    stage: StageIds.Legendary,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Grass, level: 4 }],
    home_abilities: [{ id: HomelandAbilityIds.Leisure, level: 4 }],
    season: 1,
  },
  // ─── 10002 - Танцомон ───
  {
    aniimo: Aniimos.Dazmand,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
    season: 1,
  },
  // ─── 10003 - Фульминтис ───
  {
    aniimo: Aniimos.Fulmintis,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Lightning, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
    season: 1,
  },
  {
    aniimo: Aniimos.Fulmintis,
    stage: StageIds.Nova,
    form: FormIds.Prismana,
    elements: [{ id: ElementIds.Lightning, level: 4 }, { id: ElementIds.Light, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 4 }],
    season: 1,
  },
  // ─── 10004 - Молнепрыг ───
  {
    aniimo: Aniimos.Hoptail,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }, { id: ElementIds.Lightning, level: 2 }],
    home_abilities: [{ id: HomelandAbilityIds.Artisanship, level: 3 }],
    season: 1,
  },
  // ─── 10006 - Гипнокрыл ───
  {
    aniimo: Aniimos.Hypnyto,
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Wind, level: 3 }],
    home_abilities: [{ id: HomelandAbilityIds.Hauling, level: 3 }],
    season: 1,
  },
  {
    aniimo: Aniimos.Hypnyto,
    stage: StageIds.Nova,
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
    stage: StageIds.Nova,
    form: FormIds.Basic,
    elements: [{ id: ElementIds.Fire, level: 3 }],
    home_abilities: [],
    season: 1,
  },
  {
    aniimo: Aniimos.Sparkelf,
    stage: StageIds.Nova,
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
