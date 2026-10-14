export const FormIds = {
  /* Базовая форма */ Base: "base",
  /* Форма пляжа */ Beach: "beach",
  /* Форма высокогорья */ Highland: "highland",
  /* Форма гор */ Mountain: "mountain",
  /* Форма горного леса */ MountainWoods: "mountain_woods",
  /* Призмана */ Prismana: "prismana",
  /* Форма ливня */ Rainstorm: "rainstorm",
  /* Форма снежного поля */ Snowfield: "snowfield",
  /* Форма грозы */ Thunderstorm: "thunderstorm",
} as const;

export type FormId = (typeof FormIds)[keyof typeof FormIds];
