/**
 * E - Энергичность
 * I - Инстинктивн.
 * S - Практичность
 * N - Проворность
 * T - Отстраненность
 * F - Верн.
 * J - Послушность
 * P - Спонтанность
 */
export interface Personality {
  EI: "E" | "I";
  SN: "S" | "N";
  TF: "T" | "F";
  JP: "J" | "P";
}

export type PartialPersonality = Partial<Personality>;
