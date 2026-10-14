export const AniimoNos = {
  /* 001 - Искрокус */ Emberpup: "001",
  /* 002 - Пламешерст */ Flameruff: "002",
  /* 003 - Волкожог */ Scorchhowl: "003",
  /* 004 - Пламеклык */ Inferlupa: "004",
  /* 005 - Селестис */ Celestis: "005",
  /* 006 - Стелларис */ Stellarys: "006",
  /* 007 - Чайкуша */ Chirpi: "007",
  /* 020 - Бормотун */ Hummin: "020",
  /* 021 - Ведьмун */ Hexxin: "021",
  /* 022 - Топотун */ Tuckin: "022",
  /* 047 - Белкулак */ Squarrel: "047",
  /* 048 - Хвостобой */ Squashel: "048",
  /* 056 - Балитл */ Baleetle: "056",
  /* 057 - Валитл */ Waleetle: "057",
  /* 058 - Камнюс */ Bouldus: "058",
} as const;

export type AniimoNo = (typeof AniimoNos)[keyof typeof AniimoNos];
