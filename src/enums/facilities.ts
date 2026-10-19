export const FacilityCategories = {
  material_production: "Производство материалов",
  material_processing: "Обработка материалов",
  item_production: "Производство предметов",
  utility: "Вспомогательные предметы",
  aniimo_objects: "Объекты для анимо",
} as const;

export type FacilityCategory = keyof typeof FacilityCategories;
