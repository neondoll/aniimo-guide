export const FormIds = {
  /* Базовая форма */ Basic: "basic",
  /* Форма бухты */ Bay: 'bay',
  /* Форма пляжа */ Beach: "beach",
  /* Форма облачного тумана */ Cloudmist: 'cloudmist',
  /* Форма моря цветов */ Flowerfield: 'flowerfield',
  /* Форма леса */ Forest: 'forest',
  /* Форма луга */ Grassland: 'grassland',
  /* Форма высокогорья */ Highland: "highland",
  /* Форма гор */ Mountain: "mountain",
  /* Форма горного леса */ MountainWoods: "mountain_woods",
  /* Форма илистого берега */ Mudflat: 'mudflat',
  /* Форма ночи */ Nighttime: 'nighttime',
  /* Форма плато */ Plateau: 'plateau',
  /* Форма призманы */ Prismana: "prismana",
  /* Форма ливня */ Rainfall: "rainfall",
  /* Форма снежного поля */ Snowfield: "snowfield",
  /* Форма бури */ Tempest: 'tempest',
  /* Форма грозы */ Thunderstorm: "thunderstorm",
  /* Форма башнедрева */ Towerwood: 'towerwood',
  /* Форма водопада */ Waterfall: 'waterfall',
} as const;

export type FormId = (typeof FormIds)[keyof typeof FormIds];
