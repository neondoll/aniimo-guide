import type { Priority } from "../types/recommendations";

export const PRIORITY_CLASS: Record<Priority, string> = {
  high: "text-emerald-600 font-semibold",
  medium: "text-amber-600",
  low: "text-slate-400",
};

export const PRIORITY_TITLE: Record<Priority, string> = {
  high: "Высокий приоритет",
  medium: "Средний приоритет",
  low: "Низкий приоритет",
};
