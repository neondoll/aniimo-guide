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
  {
    id: FamilyIds.Chirpi,
    name: "Чайкуша",
    member_nos: [AniimoNos.Chirpi, AniimoNos.Tromber, AniimoNos.Cornet, AniimoNos.Tubster],
  },
  // 011 - Ирис · Ирисаль · Ирисалис
  { id: FamilyIds.Iris, name: "Ирис", member_nos: [AniimoNos.Iris, AniimoNos.Irisal, AniimoNos.Irisalis] },
  // 013 - Шустрик · Шутник · Морозница · Листик
  {
    id: FamilyIds.Skippy,
    name: "Шустрик",
    member_nos: [AniimoNos.Skippy, AniimoNos.Pranky, AniimoNos.Glacy, AniimoNos.Leafy],
  },
  // 017 - Пушинка · Турбо · Дрипл
  { id: FamilyIds.Nimbi, name: "Пушинка", member_nos: [AniimoNos.Nimbi, AniimoNos.Turbo, AniimoNos.Dreaple] },
  // 020 - Бормотун · Ведьмун · Топотун
  { id: FamilyIds.Hummin, name: "Бормотун", member_nos: [AniimoNos.Hummin, AniimoNos.Hexxin, AniimoNos.Tuckin] },
  // 023 - Цветохват · Кустохват · Кристаллохват
  { id: FamilyIds.Budclaw, name: "Цветохват", member_nos: [AniimoNos.Budclaw, AniimoNos.Shrubclaw, AniimoNos.Geoclaw] },
  // 026 - Искорка · Пламерион
  { id: FamilyIds.Sparki, name: "Искорка", member_nos: [AniimoNos.Sparki, AniimoNos.Flamerion] },
  // 028 - Бояка · Миражекрыл · Снокрыл
  {
    id: FamilyIds.Flutternym,
    name: "Бояка",
    member_nos: [AniimoNos.Flutternym, AniimoNos.Gracewing, AniimoNos.Somniwing],
  },
  // 033 - Бутоносец · Шпагошип · Мироцвет
  {
    id: FamilyIds.Budsquire,
    name: "Бутоносец",
    member_nos: [AniimoNos.Budsquire, AniimoNos.Thornblade, AniimoNos.Melloblum],
  },
  // 036 - Чирлимон · Танцомон · Помагавк
  { id: FamilyIds.Pomegg, name: "Чирлимон", member_nos: [AniimoNos.Pomegg, AniimoNos.Pomawk, AniimoNos.Dazmand] },
  // 038 - Отдушечка · Фрагрансье
  { id: FamilyIds.Dewy, name: "Отдушечка", member_nos: [AniimoNos.Dewy, AniimoNos.Fragrancier] },
  // 040 - Когтис · Игнитис · Фульминтис
  { id: FamilyIds.Wisptis, name: "Когтис", member_nos: [AniimoNos.Wisptis, AniimoNos.Ignitis, AniimoNos.Fulmintis] },
  // 042 - Костесвод · Фенрир · Глинсера
  { id: FamilyIds.Bonesky, name: "Костесвод", member_nos: [AniimoNos.Bonesky, AniimoNos.Fenrier, AniimoNos.Glynsera] },
  // 045 - Вольт · Разряд
  { id: FamilyIds.Bolty, name: "Вольт", member_nos: [AniimoNos.Bolty, AniimoNos.Blazen] },
  // 047 - Белкулак · Хвостобой
  { id: FamilyIds.Squarrel, name: "Белкулак", member_nos: [AniimoNos.Squarrel, AniimoNos.Squashel] },
  // 049 - Стесняша · Ныряша · Нимфея · Пухлея
  {
    id: FamilyIds.Susuta,
    name: "Стесняша",
    member_nos: [AniimoNos.Susuta, AniimoNos.Popota, AniimoNos.Piopiota, AniimoNos.Panpanta],
  },
  // 053 - Шелли · Шелдон · Шерро
  { id: FamilyIds.Shelly, name: "Шелли", member_nos: [AniimoNos.Shelly, AniimoNos.Sheldon, AniimoNos.Sherro] },
  // 056 - Балитл · Валитл · Камнюс
  { id: FamilyIds.Baleetle, name: "Балитл", member_nos: [AniimoNos.Baleetle, AniimoNos.Waleetle, AniimoNos.Bouldus] },
  // 064 - Кусинг · Шлеминг · Бронинг · Горнинг
  {
    id: FamilyIds.Jawling,
    name: "Кусинг",
    member_nos: [AniimoNos.Jawling, AniimoNos.Helmwhelp, AniimoNos.Helgon, AniimoNos.Infergon],
  },
  // 070 - Камешек · Лавазар · Магмарекс · Камнеспин · Шахтоспин
  {
    id: FamilyIds.Pebbling,
    name: "Камешек",
    member_nos: [AniimoNos.Pebbling, AniimoNos.Lavazar, AniimoNos.Magmarex, AniimoNos.Geodeback, AniimoNos.Minespine],
  },
  // 077 - Лампадка · Лучина · Сияша
  { id: FamilyIds.Bulbly, name: "Лампадка", member_nos: [AniimoNos.Bulbly, AniimoNos.Veilfloat, AniimoNos.Luminelle] },
  // 080 - Фалу · Эрлат
  { id: FamilyIds.Fahloo, name: "Фалу", member_nos: [AniimoNos.Fahloo, AniimoNos.Erlath] },
  // 10004 - Дух дружбы
  { id: FamilyIds.Sparkelf, name: "Дух дружбы", member_nos: [AniimoNos.Sparkelf] },
  // 99996 - Лунара
  { id: FamilyIds.Lunara, name: "Лунара", member_nos: [AniimoNos.Lunara] },
  // 99998 - Гелион
  { id: FamilyIds.Helion, name: "Гелион", member_nos: [AniimoNos.Helion] },
];
