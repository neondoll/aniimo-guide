import type { Priority } from '../types/recommendations';

export const PRIORITY_CLASS: Record<Priority, string> = {
  high: 'bg-emerald-500 text-white',
  medium: 'bg-amber-500 text-white',
  low: 'bg-transparent text-slate-400',
};

export const PRIORITY_TITLE: Record<Priority, string> = {
  high: 'Высокий приоритет',
  medium: 'Средний приоритет',
  low: 'Низкий приоритет',
};
