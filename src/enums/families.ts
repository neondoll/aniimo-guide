import { AniimoNos } from "./aniimos.ts";

export const FamilyIds = {
  /* 001 - Искрокус · Пламешерст · Волкожог · Пламеклык */ Emberpup: AniimoNos.Emberpup,
  /* 005 - Селестис · Стелларис */ Celestis: AniimoNos.Celestis,
  /* 007 - Чайкуша · Кликуша · Крикуша · Каркуша */ Chirpi: AniimoNos.Chirpi,
  /* 011 - Ирис · Ирисаль · Ирисалис */ Iris: AniimoNos.Iris,
  /* 013 - Шустрик · Шутник · Морозница · Листик */ Skippy: AniimoNos.Skippy,
  /* 017 - Пушинка · Турбо · Дрипл */ Nimbi: AniimoNos.Nimbi,
  /* 020 - Бормотун · Ведьмун · Топотун */ Hummin: AniimoNos.Hummin,
  /* 026 - Искорка · Пламерион */ Sparki: AniimoNos.Sparki,
  /* 028 - Бояка · Миражекрыл · Снокрыл */ Flutternym: AniimoNos.Flutternym,
  /* 033 - Бутоносец · Шпагошип · Мироцвет */ Budsquire: AniimoNos.Budsquire,
  /* 038 - Отдушечка · Фрагрансье */ Dewy: AniimoNos.Dewy,
  /* 040 - Когтис · Игнитис · Фульминтис */ Wisptis: AniimoNos.Wisptis,
  /* 042 - Костесвод · Фенрир · Глинсера */ Bonesky: AniimoNos.Bonesky,
  /* 045 - Вольт · Разряд */ Bolty: AniimoNos.Bolty,
  /* 047 - Белкулак · Хвостобой */ Squarrel: AniimoNos.Squarrel,
  /* 049 - Стесняша · Ныряша · Нимфея · Пухлея */ Susuta: AniimoNos.Susuta,
  /* 053 - Шелли · Шелдон · Шерро */ Shelly: AniimoNos.Shelly,
  /* 056 - Балитл · Валитл · Камнюс */ Baleetle: AniimoNos.Baleetle,
  /* 070 - Камешек · Лавазар · Магмарекс · Камнеспин · Шахтоспин */ Pebbling: AniimoNos.Pebbling,
  /* 077 - Лампадка · Лучина · Сияша */ Bulbly: AniimoNos.Bulbly,
  /* 080 - Фалу · Эрлат */ Fahloo: AniimoNos.Fahloo,
  /* 11001 - Дух дружбы */ Sparkelf: AniimoNos.Sparkelf,
  /* 99996 - Лунара */ Lunara: AniimoNos.Lunara,
  /* 99998 - Гелион */ Helion: AniimoNos.Helion,
} as const;

export type FamilyId = (typeof FamilyIds)[keyof typeof FamilyIds];
