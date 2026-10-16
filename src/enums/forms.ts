export const FormIds = {
  /* Базовая форма */ Base: "base",
  /* Форма пляжа */ Beach: "beach",
  /* Форма облачного тумана */ Cloudmist: 'cloudmist',
  /* Форма Моря Цветов */ Flowerfield: 'flowerfield',
  /* Форма леса */ Forest: 'forest',
  /* Форма луга */ Grassland: 'grassland',
  /* Форма высокогорья */ Highland: "highland",
  /* Форма гор */ Mountain: "mountain",
  /* Форма горного леса */ MountainWoods: "mountain_woods",
  /* Форма ночи */ Nighttime: 'nighttime',
  /* Форма плато */ Plateau: 'plateau',
  /* Призмана */ Prismana: "prismana",
  /* Форма ливня */ Rainstorm: "rainstorm",
  /* Форма снежного поля */ Snowfield: "snowfield",
  /* Форма грозы */ Thunderstorm: "thunderstorm",
  /* Форма башнедрева */ Towerwood: 'towerwood',
} as const;

export type FormId = (typeof FormIds)[keyof typeof FormIds];
