export function getColorStyles(hex: string) {
  return {
    color: hex,
    backgroundColor: `${hex}15`, // ~8% прозрачности для фона
    borderColor: `${hex}40`,     // ~25% прозрачности для рамки
  };
}
