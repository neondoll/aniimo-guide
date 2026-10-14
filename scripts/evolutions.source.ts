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

  // 020 → 021 | 022
  { from_no: AniimoNos.Hummin, from_form_id: FormIds.Base, to_no: AniimoNos.Hexxin, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Hummin, from_form_id: FormIds.Base, to_no: AniimoNos.Tuckin, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Hummin, from_form_id: FormIds.Mountain, to_no: AniimoNos.Hexxin, to_form_id: FormIds.Mountain },
  { from_no: AniimoNos.Hummin, from_form_id: FormIds.Mountain, to_no: AniimoNos.Tuckin, to_form_id: FormIds.Mountain },

  // 047 → 048
  { from_no: AniimoNos.Squarrel, from_form_id: FormIds.Base, to_no: AniimoNos.Squashel, to_form_id: FormIds.Base },

  // 056 → 057 | 058
  { from_no: AniimoNos.Baleetle, from_form_id: FormIds.Base, to_no: AniimoNos.Waleetle, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Baleetle, from_form_id: FormIds.Base, to_no: AniimoNos.Bouldus, to_form_id: FormIds.Base },
  { from_no: AniimoNos.Baleetle, from_form_id: FormIds.Snowfield, to_no: AniimoNos.Waleetle, to_form_id: FormIds.Snowfield },
  { from_no: AniimoNos.Baleetle, from_form_id: FormIds.Snowfield, to_no: AniimoNos.Bouldus, to_form_id: FormIds.Snowfield },

  // Пример с "ночной стесняшей" из вашего описания (номера условные)
  // { from_no: 'NNN', from_form_id: FormIds.Night, to_no: 'MMM', to_form_id: FormIds.Night },
  // { from_no: 'MMM', from_form_id: FormIds.Night, to_no: 'XXX', to_form_id: FormIds.Night },
  // { from_no: 'MMM', from_form_id: FormIds.Night, to_no: 'YYY', to_form_id: FormIds.Night,
  //   requires_personality: { EI: 'I' } },
];
