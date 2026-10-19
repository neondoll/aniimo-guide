/**
 * Компаратор по позиции в order. Всё, чего нет в order, уходит в конец
 * и сортируется между собой по алфавиту — так новые способности, если вы
 * добавите их позже, не будут ломать стабильность вывода.
 */
export function compareByOrder(
  order: readonly string[],
  a: string,
  b: string,
): number {
  const ai = order.indexOf(a);
  const bi = order.indexOf(b);

  const aIdx = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
  const bIdx = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;

  if (aIdx !== bIdx) return aIdx - bIdx;

  return a.localeCompare(b);
}