import { type AniimoNo, AniimoNos } from "../src/enums/aniimos.ts";
import { type FormId, FormIds } from "../src/enums/forms.ts";
import type { PartialPersonality } from "../src/types/personality.ts";

export interface EvolutionSource {
  from_no: AniimoNo;
  from_form_id: FormId;
  to_no: AniimoNo;
  to_form_id: FormId;
  requires_personality?: PartialPersonality; // например { JP: 'P' } — нужен «воспринимающий»
}

export const evolutions: EvolutionSource[] = [
  // 001 → 002
  { from_no: AniimoNos.Emberpup, from_form_id: FormIds.Base, to_no: AniimoNos.Flameruff, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Emberpup, from_form_id: FormIds.Highland, to_no: AniimoNos.Flameruff, to_form_id: FormIds.Highland },
  { from_no: AniimoNos.Emberpup, from_form_id: FormIds.MountainWoods, to_no: AniimoNos.Flameruff, to_form_id: FormIds.MountainWoods },

  // 002 → 003 | 004
  { from_no: AniimoNos.Flameruff, from_form_id: FormIds.Base, to_no: AniimoNos.Scorchhowl, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Flameruff, from_form_id: FormIds.Base, to_no: AniimoNos.Inferlupa, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Flameruff, from_form_id: FormIds.Highland, to_no: AniimoNos.Scorchhowl, to_form_id: FormIds.Highland },
  { from_no: AniimoNos.Flameruff, from_form_id: FormIds.MountainWoods, to_no: AniimoNos.Scorchhowl, to_form_id: FormIds.MountainWoods },

  // 005 → 006
  { from_no: AniimoNos.Celestis, from_form_id: FormIds.Base, to_no: AniimoNos.Stellarys, to_form_id: FormIds.Base },

  // 007 → 008 | 009 | 010
  { from_no: AniimoNos.Chirpi, from_form_id: FormIds.Base, to_no: AniimoNos.Tromber, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Chirpi, from_form_id: FormIds.Base, to_no: AniimoNos.Cornet, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Chirpi, from_form_id: FormIds.Base, to_no: AniimoNos.Tubster, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Chirpi, from_form_id: FormIds.Beach, to_no: AniimoNos.Tromber, to_form_id: FormIds.Beach },
  { from_no: AniimoNos.Chirpi, from_form_id: FormIds.Beach, to_no: AniimoNos.Cornet, to_form_id: FormIds.Beach },
  { from_no: AniimoNos.Chirpi, from_form_id: FormIds.Beach, to_no: AniimoNos.Tubster, to_form_id: FormIds.Beach },
  { from_no: AniimoNos.Chirpi, from_form_id: FormIds.Highland, to_no: AniimoNos.Tromber, to_form_id: FormIds.Highland },
  { from_no: AniimoNos.Chirpi, from_form_id: FormIds.Highland, to_no: AniimoNos.Cornet, to_form_id: FormIds.Highland },
  { from_no: AniimoNos.Chirpi, from_form_id: FormIds.Highland, to_no: AniimoNos.Tubster, to_form_id: FormIds.Highland },

  // 011 → 012
  { from_no: AniimoNos.Iris, from_form_id: FormIds.Base, to_no: AniimoNos.Irisal, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Iris, from_form_id: FormIds.Highland, to_no: AniimoNos.Irisal, to_form_id: FormIds.Highland },
  { from_no: AniimoNos.Iris, from_form_id: FormIds.Forest, to_no: AniimoNos.Irisal, to_form_id: FormIds.Forest },
  { from_no: AniimoNos.Iris, from_form_id: FormIds.Grassland, to_no: AniimoNos.Irisal, to_form_id: FormIds.Grassland },
  { from_no: AniimoNos.Iris, from_form_id: FormIds.Prismana, to_no: AniimoNos.Irisal, to_form_id: FormIds.Prismana },
  { from_no: AniimoNos.Iris, from_form_id: FormIds.Plateau, to_no: AniimoNos.Irisal, to_form_id: FormIds.Plateau },
  { from_no: AniimoNos.Iris, from_form_id: FormIds.MountainWoods, to_no: AniimoNos.Irisal, to_form_id: FormIds.MountainWoods },

  // 013 → 014
  { from_no: AniimoNos.Skippy, from_form_id: FormIds.Base, to_no: AniimoNos.Pranky, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Skippy, from_form_id: FormIds.Flowerfield, to_no: AniimoNos.Pranky, to_form_id: FormIds.Flowerfield },
  { from_no: AniimoNos.Skippy, from_form_id: FormIds.Snowfield, to_no: AniimoNos.Pranky, to_form_id: FormIds.Snowfield },

  // 014 → 015 | 016
  { from_no: AniimoNos.Pranky, from_form_id: FormIds.Base, to_no: AniimoNos.Glacy, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Pranky, from_form_id: FormIds.Base, to_no: AniimoNos.Leafy, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Pranky, from_form_id: FormIds.Flowerfield, to_no: AniimoNos.Glacy, to_form_id: FormIds.Flowerfield },
  { from_no: AniimoNos.Pranky, from_form_id: FormIds.Snowfield, to_no: AniimoNos.Glacy, to_form_id: FormIds.Snowfield },

  // 017 → 018 | 019
  { from_no: AniimoNos.Nimbi, from_form_id: FormIds.Base, to_no: AniimoNos.Turbo, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Nimbi, from_form_id: FormIds.Base, to_no: AniimoNos.Dreaple, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Nimbi, from_form_id: FormIds.Rainstorm, to_no: AniimoNos.Turbo, to_form_id: FormIds.Rainstorm },
  { from_no: AniimoNos.Nimbi, from_form_id: FormIds.Cloudmist, to_no: AniimoNos.Turbo, to_form_id: FormIds.Cloudmist },
  { from_no: AniimoNos.Nimbi, from_form_id: FormIds.Plateau, to_no: AniimoNos.Turbo, to_form_id: FormIds.Plateau },

  // 020 → 021 | 022
  { from_no: AniimoNos.Hummin, from_form_id: FormIds.Base, to_no: AniimoNos.Hexxin, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Hummin, from_form_id: FormIds.Base, to_no: AniimoNos.Tuckin, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Hummin, from_form_id: FormIds.Mountain, to_no: AniimoNos.Hexxin, to_form_id: FormIds.Mountain },
  { from_no: AniimoNos.Hummin, from_form_id: FormIds.Mountain, to_no: AniimoNos.Tuckin, to_form_id: FormIds.Mountain },

  // 026 → 027
  { from_no: AniimoNos.Sparki, from_form_id: FormIds.Base, to_no: AniimoNos.Flamerion, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Sparki, from_form_id: FormIds.Highland, to_no: AniimoNos.Flamerion, to_form_id: FormIds.Highland },
  { from_no: AniimoNos.Sparki, from_form_id: FormIds.Forest, to_no: AniimoNos.Flamerion, to_form_id: FormIds.Forest },
  { from_no: AniimoNos.Sparki, from_form_id: FormIds.Flowerfield, to_no: AniimoNos.Flamerion, to_form_id: FormIds.Flowerfield },

  // 028 → 029
  { from_no: AniimoNos.Flutternym, from_form_id: FormIds.Base, to_no: AniimoNos.Gracewing, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Flutternym, from_form_id: FormIds.Flowerfield, to_no: AniimoNos.Gracewing, to_form_id: FormIds.Flowerfield },
  { from_no: AniimoNos.Flutternym, from_form_id: FormIds.Nighttime, to_no: AniimoNos.Gracewing, to_form_id: FormIds.Nighttime },
  { from_no: AniimoNos.Flutternym, from_form_id: FormIds.MountainWoods, to_no: AniimoNos.Gracewing, to_form_id: FormIds.MountainWoods },

  // 033 → 034 | 035
  { from_no: AniimoNos.Budsquire, from_form_id: FormIds.Base, to_no: AniimoNos.Thornblade, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Budsquire, from_form_id: FormIds.Base, to_no: AniimoNos.Melloblum, to_form_id: FormIds.Base, requires_personality: { TF: 'F' } },
  { from_no: AniimoNos.Budsquire, from_form_id: FormIds.Towerwood, to_no: AniimoNos.Thornblade, to_form_id: FormIds.Towerwood },

  // 036 → 037 | 10002
  { from_no: AniimoNos.Pomegg, from_form_id: FormIds.Base, to_no: AniimoNos.Pomawk, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Pomegg, from_form_id: FormIds.Base, to_no: AniimoNos.Dazmand, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Pomegg, from_form_id: FormIds.Snowfield, to_no: AniimoNos.Pomawk, to_form_id: FormIds.Snowfield },
  { from_no: AniimoNos.Pomegg, from_form_id: FormIds.Highland, to_no: AniimoNos.Pomawk, to_form_id: FormIds.Highland },
  { from_no: AniimoNos.Pomegg, from_form_id: FormIds.Flowerfield, to_no: AniimoNos.Pomawk, to_form_id: FormIds.Flowerfield },

  // 038 → 039
  { from_no: AniimoNos.Dewy, from_form_id: FormIds.Base, to_no: AniimoNos.Fragrancier, to_form_id: FormIds.Base },

  // 040 → 041 | Фульминтис
  { from_no: AniimoNos.Wisptis, from_form_id: FormIds.Base, to_no: AniimoNos.Ignitis, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Wisptis, from_form_id: FormIds.Base, to_no: AniimoNos.Fulmintis, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Wisptis, from_form_id: FormIds.Forest, to_no: AniimoNos.Ignitis, to_form_id: FormIds.Forest },
  { from_no: AniimoNos.Wisptis, from_form_id: FormIds.Highland, to_no: AniimoNos.Ignitis, to_form_id: FormIds.Highland },

  // 042 → 043
  { from_no: AniimoNos.Bonesky, from_form_id: FormIds.Base, to_no: AniimoNos.Fenrier, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Bonesky, from_form_id: FormIds.Nighttime, to_no: AniimoNos.Fenrier, to_form_id: FormIds.Nighttime },

  // 043 → 044
  { from_no: AniimoNos.Fenrier, from_form_id: FormIds.Base, to_no: AniimoNos.Glynsera, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Fenrier, from_form_id: FormIds.Nighttime, to_no: AniimoNos.Glynsera, to_form_id: FormIds.Nighttime },

  // 045 → 046
  { from_no: AniimoNos.Bolty, from_form_id: FormIds.Base, to_no: AniimoNos.Blazen, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Bolty, from_form_id: FormIds.MountainWoods, to_no: AniimoNos.Blazen, to_form_id: FormIds.MountainWoods },

  // 047 → 048
  { from_no: AniimoNos.Squarrel, from_form_id: FormIds.Base, to_no: AniimoNos.Squashel, to_form_id: FormIds.Base },

  // 049 → 050
  { from_no: AniimoNos.Susuta, from_form_id: FormIds.Base, to_no: AniimoNos.Popota, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Susuta, from_form_id: FormIds.Nighttime, to_no: AniimoNos.Popota, to_form_id: FormIds.Nighttime },

  // 050 → 051 | 052
  { from_no: AniimoNos.Popota, from_form_id: FormIds.Base, to_no: AniimoNos.Piopiota, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Popota, from_form_id: FormIds.Base, to_no: AniimoNos.Panpanta, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Popota, from_form_id: FormIds.Nighttime, to_no: AniimoNos.Piopiota, to_form_id: FormIds.Nighttime, requires_personality: { EI: 'E', JP: 'P' } },
  { from_no: AniimoNos.Popota, from_form_id: FormIds.Nighttime, to_no: AniimoNos.Panpanta, to_form_id: FormIds.Nighttime, requires_personality: { EI: 'I', JP: 'J' } },

  // 053 → 054
  { from_no: AniimoNos.Shelly, from_form_id: FormIds.Base, to_no: AniimoNos.Sheldon, to_form_id: FormIds.Base },

  // 054 → 055
  { from_no: AniimoNos.Sheldon, from_form_id: FormIds.Base, to_no: AniimoNos.Sherro, to_form_id: FormIds.Base },

  // 056 → 057 | 058
  { from_no: AniimoNos.Baleetle, from_form_id: FormIds.Base, to_no: AniimoNos.Waleetle, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Baleetle, from_form_id: FormIds.Base, to_no: AniimoNos.Bouldus, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Baleetle, from_form_id: FormIds.Snowfield, to_no: AniimoNos.Waleetle, to_form_id: FormIds.Snowfield },
  { from_no: AniimoNos.Baleetle, from_form_id: FormIds.Snowfield, to_no: AniimoNos.Bouldus, to_form_id: FormIds.Snowfield },

  // 070 → 071 | 073
  { from_no: AniimoNos.Pebbling, from_form_id: FormIds.Base, to_no: AniimoNos.Lavazar, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Pebbling, from_form_id: FormIds.Base, to_no: AniimoNos.Geodeback, to_form_id: FormIds.Base },

  // 071 → 072
  { from_no: AniimoNos.Lavazar, from_form_id: FormIds.Base, to_no: AniimoNos.Magmarex, to_form_id: FormIds.Base },

  // 073 → 074
  { from_no: AniimoNos.Geodeback, from_form_id: FormIds.Base, to_no: AniimoNos.Minespine, to_form_id: FormIds.Base },

  // 077 → 078
  { from_no: AniimoNos.Bulbly, from_form_id: FormIds.Base, to_no: AniimoNos.Veilfloat, to_form_id: FormIds.Base },

  // 078 → 079
  { from_no: AniimoNos.Veilfloat, from_form_id: FormIds.Base, to_no: AniimoNos.Luminelle, to_form_id: FormIds.Base },

  // 080 → 081
  { from_no: AniimoNos.Fahloo, from_form_id: FormIds.Base, to_no: AniimoNos.Erlath, to_form_id: FormIds.Base },
];
