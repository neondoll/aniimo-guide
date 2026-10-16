/**
 * E - Энергичность
 * I - Инстинктивность
 * S - Практичность
 * N - Проворство
 * T - Цепкость
 * F - Верность
 * J - Рассудительность
 * P - Игривость
 */
export interface Personality {
  EI: "E" | "I";
  SN: "S" | "N";
  TF: "T" | "F";
  JP: "J" | "P";
}

export type PartialPersonality = Partial<Personality>;
