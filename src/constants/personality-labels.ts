export const PERSONALITY_LABELS = {
  E: 'Энергичность',
  I: 'Инстинктивность',
  S: 'Практичность',
  N: 'Проворство',
  T: 'Цепкость',
  F: 'Верность',
  J: 'Рассудительность',
  P: 'Игривость',
} as const;

export type PersonalityAxis = "EI" | "SN" | "TF" | "JP";
export type PersonalitySide = keyof typeof PERSONALITY_LABELS;
