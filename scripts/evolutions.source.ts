import { type AniimoRef, Aniimos } from './aniimos.refs.ts'
import { type FormId, FormIds } from "../src/enums/forms.ts";
import type { PartialPersonality } from "../src/types/personality.ts";

export interface EvolutionSource {
  from: AniimoRef;
  from_form: FormId;
  to: AniimoRef;
  to_form: FormId;
  requires_personality?: PartialPersonality;
}

export const evolutions: EvolutionSource[] = [
  // Искрокус → Пламешерст
  { from: Aniimos.Emberpup, from_form: FormIds.Basic, to: Aniimos.Flameruff, to_form: FormIds.Basic },
  { from: Aniimos.Emberpup, from_form: FormIds.Highland, to: Aniimos.Flameruff, to_form: FormIds.Highland },
  { from: Aniimos.Emberpup, from_form: FormIds.MountainWoods, to: Aniimos.Flameruff, to_form: FormIds.MountainWoods },
  // Пламешерст → Волкожог | Пламеклык
  { from: Aniimos.Flameruff, from_form: FormIds.Basic, to: Aniimos.Scorchhowl, to_form: FormIds.Basic },
  { from: Aniimos.Flameruff, from_form: FormIds.Basic, to: Aniimos.Inferlupa, to_form: FormIds.Basic },
  { from: Aniimos.Flameruff, from_form: FormIds.Highland, to: Aniimos.Scorchhowl, to_form: FormIds.Highland },
  { from: Aniimos.Flameruff, from_form: FormIds.MountainWoods, to: Aniimos.Scorchhowl, to_form: FormIds.MountainWoods },
  // Селестис → Стелларис
  { from: Aniimos.Celestis, from_form: FormIds.Basic, to: Aniimos.Stellarys, to_form: FormIds.Basic },
  // Чайкуша → Кликуша | Крикуша | Каркуша
  { from: Aniimos.Chirpi, from_form: FormIds.Basic, to: Aniimos.Tromber, to_form: FormIds.Basic },
  { from: Aniimos.Chirpi, from_form: FormIds.Basic, to: Aniimos.Cornet, to_form: FormIds.Basic },
  { from: Aniimos.Chirpi, from_form: FormIds.Basic, to: Aniimos.Tubster, to_form: FormIds.Basic },
  { from: Aniimos.Chirpi, from_form: FormIds.Beach, to: Aniimos.Tromber, to_form: FormIds.Beach },
  { from: Aniimos.Chirpi, from_form: FormIds.Beach, to: Aniimos.Cornet, to_form: FormIds.Beach },
  { from: Aniimos.Chirpi, from_form: FormIds.Beach, to: Aniimos.Tubster, to_form: FormIds.Beach },
  { from: Aniimos.Chirpi, from_form: FormIds.Highland, to: Aniimos.Tromber, to_form: FormIds.Highland },
  { from: Aniimos.Chirpi, from_form: FormIds.Highland, to: Aniimos.Cornet, to_form: FormIds.Highland },
  { from: Aniimos.Chirpi, from_form: FormIds.Highland, to: Aniimos.Tubster, to_form: FormIds.Highland },
  // Ирис → Ирисаль
  { from: Aniimos.Iris, from_form: FormIds.Basic, to: Aniimos.Irisal, to_form: FormIds.Basic },
  { from: Aniimos.Iris, from_form: FormIds.Highland, to: Aniimos.Irisal, to_form: FormIds.Highland },
  { from: Aniimos.Iris, from_form: FormIds.Forest, to: Aniimos.Irisal, to_form: FormIds.Forest },
  { from: Aniimos.Iris, from_form: FormIds.Grassland, to: Aniimos.Irisal, to_form: FormIds.Grassland },
  { from: Aniimos.Iris, from_form: FormIds.Prismana, to: Aniimos.Irisal, to_form: FormIds.Prismana },
  { from: Aniimos.Iris, from_form: FormIds.Plateau, to: Aniimos.Irisal, to_form: FormIds.Plateau },
  { from: Aniimos.Iris, from_form: FormIds.MountainWoods, to: Aniimos.Irisal, to_form: FormIds.MountainWoods },
  // Шустрик → Шутник
  { from: Aniimos.Skippy, from_form: FormIds.Basic, to: Aniimos.Pranky, to_form: FormIds.Basic },
  { from: Aniimos.Skippy, from_form: FormIds.Flowerfield, to: Aniimos.Pranky, to_form: FormIds.Flowerfield },
  { from: Aniimos.Skippy, from_form: FormIds.Snowfield, to: Aniimos.Pranky, to_form: FormIds.Snowfield },
  // Шутник → Морозница | Листик
  { from: Aniimos.Pranky, from_form: FormIds.Basic, to: Aniimos.Glacy, to_form: FormIds.Basic },
  { from: Aniimos.Pranky, from_form: FormIds.Basic, to: Aniimos.Leafy, to_form: FormIds.Basic },
  { from: Aniimos.Pranky, from_form: FormIds.Flowerfield, to: Aniimos.Glacy, to_form: FormIds.Flowerfield },
  { from: Aniimos.Pranky, from_form: FormIds.Snowfield, to: Aniimos.Glacy, to_form: FormIds.Snowfield },
  // Пушинка → Турбо | Дрипл
  { from: Aniimos.Nimbi, from_form: FormIds.Basic, to: Aniimos.Turbo, to_form: FormIds.Basic },
  { from: Aniimos.Nimbi, from_form: FormIds.Basic, to: Aniimos.Dreaple, to_form: FormIds.Basic },
  { from: Aniimos.Nimbi, from_form: FormIds.Rainfall, to: Aniimos.Turbo, to_form: FormIds.Rainfall },
  { from: Aniimos.Nimbi, from_form: FormIds.Cloudmist, to: Aniimos.Turbo, to_form: FormIds.Cloudmist },
  { from: Aniimos.Nimbi, from_form: FormIds.Plateau, to: Aniimos.Turbo, to_form: FormIds.Plateau },
  // Бормотун → Ведьмун | Топотун
  { from: Aniimos.Hummin, from_form: FormIds.Basic, to: Aniimos.Hexxin, to_form: FormIds.Basic },
  { from: Aniimos.Hummin, from_form: FormIds.Basic, to: Aniimos.Tuckin, to_form: FormIds.Basic },
  { from: Aniimos.Hummin, from_form: FormIds.Mountain, to: Aniimos.Hexxin, to_form: FormIds.Mountain },
  { from: Aniimos.Hummin, from_form: FormIds.Mountain, to: Aniimos.Tuckin, to_form: FormIds.Mountain },
  // Цветохват → Кустохват | Кристаллохват
  { from: Aniimos.Budclaw, from_form: FormIds.Basic, to: Aniimos.Shrubclaw, to_form: FormIds.Basic },
  { from: Aniimos.Budclaw, from_form: FormIds.Basic, to: Aniimos.Geoclaw, to_form: FormIds.Basic, requires_personality: { TF: 'T' } },
  { from: Aniimos.Budclaw, from_form: FormIds.Mudflat, to: Aniimos.Shrubclaw, to_form: FormIds.Mudflat },
  { from: Aniimos.Budclaw, from_form: FormIds.Beach, to: Aniimos.Shrubclaw, to_form: FormIds.Beach },
  { from: Aniimos.Budclaw, from_form: FormIds.Bay, to: Aniimos.Shrubclaw, to_form: FormIds.Bay },
  // Искорка → Пламерион
  { from: Aniimos.Sparki, from_form: FormIds.Basic, to: Aniimos.Flamerion, to_form: FormIds.Basic },
  { from: Aniimos.Sparki, from_form: FormIds.Highland, to: Aniimos.Flamerion, to_form: FormIds.Highland },
  { from: Aniimos.Sparki, from_form: FormIds.Forest, to: Aniimos.Flamerion, to_form: FormIds.Forest },
  { from: Aniimos.Sparki, from_form: FormIds.Flowerfield, to: Aniimos.Flamerion, to_form: FormIds.Flowerfield },
  // Бояка → Миражекрыл
  { from: Aniimos.Flutternym, from_form: FormIds.Basic, to: Aniimos.Gracewing, to_form: FormIds.Basic },
  { from: Aniimos.Flutternym, from_form: FormIds.Flowerfield, to: Aniimos.Gracewing, to_form: FormIds.Flowerfield },
  { from: Aniimos.Flutternym, from_form: FormIds.Nighttime, to: Aniimos.Gracewing, to_form: FormIds.Nighttime },
  { from: Aniimos.Flutternym, from_form: FormIds.MountainWoods, to: Aniimos.Gracewing, to_form: FormIds.MountainWoods },
  // Эко → Эклу | Экрим
  { from: Aniimos.Eko, from_form: FormIds.Basic, to: Aniimos.Eklue, to_form: FormIds.Basic },
  { from: Aniimos.Eko, from_form: FormIds.Basic, to: Aniimos.Ekrim, to_form: FormIds.Basic },
  // Бутоносец → Шпагошип | Мироцвет
  { from: Aniimos.Budsquire, from_form: FormIds.Basic, to: Aniimos.Thornblade, to_form: FormIds.Basic },
  { from: Aniimos.Budsquire, from_form: FormIds.Basic, to: Aniimos.Melloblum, to_form: FormIds.Basic, requires_personality: { TF: 'F' } },
  { from: Aniimos.Budsquire, from_form: FormIds.Towerwood, to: Aniimos.Thornblade, to_form: FormIds.Towerwood },
  // Чирлимон → Помагавк | Танцомон
  { from: Aniimos.Pomegg, from_form: FormIds.Basic, to: Aniimos.Pomawk, to_form: FormIds.Basic },
  { from: Aniimos.Pomegg, from_form: FormIds.Basic, to: Aniimos.Dazmand, to_form: FormIds.Basic },
  { from: Aniimos.Pomegg, from_form: FormIds.Snowfield, to: Aniimos.Pomawk, to_form: FormIds.Snowfield },
  { from: Aniimos.Pomegg, from_form: FormIds.Highland, to: Aniimos.Pomawk, to_form: FormIds.Highland },
  { from: Aniimos.Pomegg, from_form: FormIds.Flowerfield, to: Aniimos.Pomawk, to_form: FormIds.Flowerfield },
  // Отдушечка → Фрагрансье
  { from: Aniimos.Dewy, from_form: FormIds.Basic, to: Aniimos.Fragrancier, to_form: FormIds.Basic },
  // Когтис → Игнитис | Фульминтис
  { from: Aniimos.Wisptis, from_form: FormIds.Basic, to: Aniimos.Ignitis, to_form: FormIds.Basic },
  { from: Aniimos.Wisptis, from_form: FormIds.Basic, to: Aniimos.Fulmintis, to_form: FormIds.Basic },
  { from: Aniimos.Wisptis, from_form: FormIds.Forest, to: Aniimos.Ignitis, to_form: FormIds.Forest },
  { from: Aniimos.Wisptis, from_form: FormIds.Highland, to: Aniimos.Ignitis, to_form: FormIds.Highland },
  // Костесвод → Фенрир
  { from: Aniimos.Bonesky, from_form: FormIds.Basic, to: Aniimos.Fenrier, to_form: FormIds.Basic },
  { from: Aniimos.Bonesky, from_form: FormIds.Nighttime, to: Aniimos.Fenrier, to_form: FormIds.Nighttime },
  // Фенрир → Глинсера
  { from: Aniimos.Fenrier, from_form: FormIds.Basic, to: Aniimos.Glynsera, to_form: FormIds.Basic },
  { from: Aniimos.Fenrier, from_form: FormIds.Nighttime, to: Aniimos.Glynsera, to_form: FormIds.Nighttime },
  // Вольт → Разряд | Молнепрыг
  { from: Aniimos.Bolty, from_form: FormIds.Basic, to: Aniimos.Blazen, to_form: FormIds.Basic },
  { from: Aniimos.Bolty, from_form: FormIds.Basic, to: Aniimos.Hoptail, to_form: FormIds.Basic },
  { from: Aniimos.Bolty, from_form: FormIds.MountainWoods, to: Aniimos.Blazen, to_form: FormIds.MountainWoods },
  // Белкулак → Хвостобой
  { from: Aniimos.Squarrel, from_form: FormIds.Basic, to: Aniimos.Squashel, to_form: FormIds.Basic },
  // Стесняша → Ныряша
  { from: Aniimos.Susuta, from_form: FormIds.Basic, to: Aniimos.Popota, to_form: FormIds.Basic },
  { from: Aniimos.Susuta, from_form: FormIds.Nighttime, to: Aniimos.Popota, to_form: FormIds.Nighttime },
  // Ныряша → Нимфея | Пухлея
  { from: Aniimos.Popota, from_form: FormIds.Basic, to: Aniimos.Piopiota, to_form: FormIds.Basic },
  { from: Aniimos.Popota, from_form: FormIds.Basic, to: Aniimos.Panpanta, to_form: FormIds.Basic },
  { from: Aniimos.Popota, from_form: FormIds.Nighttime, to: Aniimos.Piopiota, to_form: FormIds.Nighttime, requires_personality: { EI: 'E', JP: 'P' } },
  { from: Aniimos.Popota, from_form: FormIds.Nighttime, to: Aniimos.Panpanta, to_form: FormIds.Nighttime, requires_personality: { EI: 'I', JP: 'J' } },
  // Шелли → Шелдон
  { from: Aniimos.Shelly, from_form: FormIds.Basic, to: Aniimos.Sheldon, to_form: FormIds.Basic },
  // Шелдон → Шерро
  { from: Aniimos.Sheldon, from_form: FormIds.Basic, to: Aniimos.Sherro, to_form: FormIds.Basic },
  // Балитл → Валитл | Камнюс
  { from: Aniimos.Baleetle, from_form: FormIds.Basic, to: Aniimos.Waleetle, to_form: FormIds.Basic },
  { from: Aniimos.Baleetle, from_form: FormIds.Basic, to: Aniimos.Bouldus, to_form: FormIds.Basic },
  { from: Aniimos.Baleetle, from_form: FormIds.Snowfield, to: Aniimos.Waleetle, to_form: FormIds.Snowfield },
  { from: Aniimos.Baleetle, from_form: FormIds.Snowfield, to: Aniimos.Bouldus, to_form: FormIds.Snowfield },
  // Фентуфт → Фенмейн
  { from: Aniimos.Fentuft, from_form: FormIds.Basic, to: Aniimos.Fenmane, to_form: FormIds.Basic },
  // Шлемут → Крутут | Робкут
  { from: Aniimos.Helmut, from_form: FormIds.Basic, to: Aniimos.Pawney, to_form: FormIds.Basic },
  { from: Aniimos.Helmut, from_form: FormIds.Basic, to: Aniimos.Rookey, to_form: FormIds.Basic },
  { from: Aniimos.Helmut, from_form: FormIds.Snowfield, to: Aniimos.Pawney, to_form: FormIds.Snowfield },
  { from: Aniimos.Helmut, from_form: FormIds.Snowfield, to: Aniimos.Rookey, to_form: FormIds.Snowfield },
  { from: Aniimos.Helmut, from_form: FormIds.MountainWoods, to: Aniimos.Pawney, to_form: FormIds.MountainWoods },
  { from: Aniimos.Helmut, from_form: FormIds.MountainWoods, to: Aniimos.Rookey, to_form: FormIds.MountainWoods },
  // Кусинг → Шлеминг
  { from: Aniimos.Jawling, from_form: FormIds.Basic, to: Aniimos.Helmwhelp, to_form: FormIds.Basic },
  { from: Aniimos.Jawling, from_form: FormIds.Mountain, to: Aniimos.Helmwhelp, to_form: FormIds.Mountain },
  // Шлеминг → Бронинг | Горнинг
  { from: Aniimos.Helmwhelp, from_form: FormIds.Basic, to: Aniimos.Helgon, to_form: FormIds.Basic },
  { from: Aniimos.Helmwhelp, from_form: FormIds.Basic, to: Aniimos.Infergon, to_form: FormIds.Basic },
  { from: Aniimos.Helmwhelp, from_form: FormIds.Mountain, to: Aniimos.Helgon, to_form: FormIds.Mountain },
  // Медвежик → Грызля
  { from: Aniimos.Cubbo, from_form: FormIds.Basic, to: Aniimos.Grizbo, to_form: FormIds.Basic },
  // Камешек → Лавазар | Камнеспин
  { from: Aniimos.Pebbling, from_form: FormIds.Basic, to: Aniimos.Lavazar, to_form: FormIds.Basic },
  { from: Aniimos.Pebbling, from_form: FormIds.Basic, to: Aniimos.Geodeback, to_form: FormIds.Basic },
  // Лавазар → Магмарекс
  { from: Aniimos.Lavazar, from_form: FormIds.Basic, to: Aniimos.Magmarex, to_form: FormIds.Basic },
  // Камнеспин → Шахтоспин
  { from: Aniimos.Geodeback, from_form: FormIds.Basic, to: Aniimos.Minespine, to_form: FormIds.Basic },
  // Уютнит → Байлит
  { from: Aniimos.Cozite, from_form: FormIds.Basic, to: Aniimos.Bailite, to_form: FormIds.Basic },
  // Лампадка → Лучина
  { from: Aniimos.Bulbly, from_form: FormIds.Basic, to: Aniimos.Veilfloat, to_form: FormIds.Basic },
  // Лучина → Сияша
  { from: Aniimos.Veilfloat, from_form: FormIds.Basic, to: Aniimos.Luminelle, to_form: FormIds.Basic },
  // Фалу → Эрлат
  { from: Aniimos.Fahloo, from_form: FormIds.Basic, to: Aniimos.Erlath, to_form: FormIds.Basic },
  // Рифиш → Коралис
  { from: Aniimos.Reefish, from_form: FormIds.Basic, to: Aniimos.Coraliz, to_form: FormIds.Basic },
  { from: Aniimos.Reefish, from_form: FormIds.Rainfall, to: Aniimos.Coraliz, to_form: FormIds.Rainfall },
  // Гипносыч → Гипноу | Гипнокрыл
  { from: Aniimos.Hypnowl, from_form: FormIds.Basic, to: Aniimos.Mesmerowl, to_form: FormIds.Basic },
  { from: Aniimos.Hypnowl, from_form: FormIds.Basic, to: Aniimos.Hypnyto, to_form: FormIds.Basic },
  // Рифиш → Коралис
  { from: Aniimos.Dewlop, from_form: FormIds.Basic, to: Aniimos.Dewple, to_form: FormIds.Basic },
  { from: Aniimos.Dewlop, from_form: FormIds.Waterfall, to: Aniimos.Dewple, to_form: FormIds.Waterfall },
  // Монетгейст → Кошмарик
  { from: Aniimos.Coinwisp, from_form: FormIds.Basic, to: Aniimos.Pouchwisp, to_form: FormIds.Basic },
  // Листовечка → Милашечка
  { from: Aniimos.Bubbeep, from_form: FormIds.Basic, to: Aniimos.Glameep, to_form: FormIds.Basic },
  // Шарикус → Гачапус
  { from: Aniimos.Popapus, from_form: FormIds.Basic, to: Aniimos.Gachapus, to_form: FormIds.Basic },
  // Сахарок → Сладкоежка | Сластена
  { from: Aniimos.Sugarfish, from_form: FormIds.Basic, to: Aniimos.Sugarslime, to_form: FormIds.Basic },
  { from: Aniimos.Sugarfish, from_form: FormIds.Basic, to: Aniimos.Sugartini, to_form: FormIds.Basic },
  // Кувшинчик → Лялия
  { from: Aniimos.Lilipole, from_form: FormIds.Basic, to: Aniimos.Scrubbit, to_form: FormIds.Basic },
  // Крокоступ → Крокоряга
  { from: Aniimos.Salabask, from_form: FormIds.Basic, to: Aniimos.Crocobask, to_form: FormIds.Basic },
  // Пыльценосец → Шмелевяк | Пчелонарх
  { from: Aniimos.Puffby, from_form: FormIds.Basic, to: Aniimos.Buffby, to_form: FormIds.Basic },
  { from: Aniimos.Puffby, from_form: FormIds.Basic, to: Aniimos.Royalby, to_form: FormIds.Basic },
  // Пилорыб → Кругокусь
  { from: Aniimos.Saws, from_form: FormIds.Basic, to: Aniimos.Whirlbite, to_form: FormIds.Basic },
  // Задирак → Джебстер
  { from: Aniimos.Prawnch, from_form: FormIds.Basic, to: Aniimos.Jabster, to_form: FormIds.Basic },
  // Волнорез → Волнопрыск
  { from: Aniimos.Jeglid, from_form: FormIds.Basic, to: Aniimos.Jeburst, to_form: FormIds.Basic },
  { from: Aniimos.Jeglid, from_form: FormIds.Tempest, to: Aniimos.Jeburst, to_form: FormIds.Tempest },
];
