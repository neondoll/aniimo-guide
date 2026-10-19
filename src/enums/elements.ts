export const ElementIds = {
  /* Тьма */ Dark: "dark",
  /* Земля */ Earth: "earth",
  /* Огонь */ Fire: "fire",
  /* Трава */ Grass: "grass",
  /* Лед */ Ice: "ice",
  /* Свет */ Light: "light",
  /* Молния */ Lightning: "lightning",
  /* Вода */ Water: "water",
  /* Ветер */ Wind: "wind",
} as const;
export const ElementOrder: readonly ElementId[] = [
  ElementIds.Ice,
  ElementIds.Water,
  ElementIds.Lightning,
  ElementIds.Fire,
  ElementIds.Grass,
  ElementIds.Earth,
  ElementIds.Wind,
  ElementIds.Dark,
  ElementIds.Light,
];

export type ElementId = (typeof ElementIds)[keyof typeof ElementIds];
