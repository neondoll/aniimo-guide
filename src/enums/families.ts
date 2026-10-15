import { AniimoNos } from "./aniimos.ts";

export const FamilyIds = {
  /* 001 - Искрокус · Пламешерст · Волкожог · Пламеклык */ Emberpup: AniimoNos.Emberpup,
  /* 005 - Селестис · Стелларис */ Celestis: AniimoNos.Celestis,
  /* 007 - Чайкуша · Кликуша · Крикуша · Каркуша */ Chirpi: AniimoNos.Chirpi,
  /* 017 - Пушинка · Турбо · Дрипл */ Nimbi: AniimoNos.Nimbi,
  /* 020 - Бормотун · Ведьмун · Топотун */ Hummin: AniimoNos.Hummin,
  /* 038 - Отдушечка · Фрагрансье */ Dewy: AniimoNos.Dewy,
  /* 047 - Белкулак · Хвостобой */ Squarrel: AniimoNos.Squarrel,
  /* 056 - Балитл · Валитл · Камнюс */ Baleetle: AniimoNos.Baleetle,
} as const;

export type FamilyId = (typeof FamilyIds)[keyof typeof FamilyIds];
