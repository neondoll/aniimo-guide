import { AniimoNos } from "../src/enums/aniimos.ts";
import { FamilyIds } from "../src/enums/families.ts";
import type { Family } from "../src/types/family.ts";

export const families: Family[] = [
  // 001 - Искрокус · Пламешерст · Волкожог · Пламеклык
  {
    id: FamilyIds.Emberpup,
    name: "Искрокус",
    member_nos: [AniimoNos.Emberpup, AniimoNos.Flameruff, AniimoNos.Scorchhowl, AniimoNos.Inferlupa],
  },
  // 005 - Селестис · Стелларис
  { id: FamilyIds.Celestis, name: "Селестис", member_nos: [AniimoNos.Celestis, AniimoNos.Stellarys] },
  // 007 - Чайкуша · Кликуша · Крикуша · Каркуша
  { id: FamilyIds.Chirpi, name: "Чайкуша", member_nos: [AniimoNos.Chirpi] },
  // 020 - Бормотун · Ведьмун · Топотун
  { id: FamilyIds.Hummin, name: "Бормотун", member_nos: [AniimoNos.Hummin, AniimoNos.Hexxin, AniimoNos.Tuckin] },
  // 047 - Белкулак · Хвостобой
  { id: FamilyIds.Squarrel, name: "Белкулак", member_nos: [AniimoNos.Squarrel, AniimoNos.Squashel] },
  // 056 - Балитл · Валитл · Камнюс
  { id: FamilyIds.Baleetle, name: "Балитл", member_nos: [AniimoNos.Baleetle, AniimoNos.Waleetle, AniimoNos.Bouldus] },
];
