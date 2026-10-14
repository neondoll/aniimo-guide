export function assetUrl(path: string | undefined | null): string {
  if (!path) return "";

  if (/^https?:\/\//.test(path)) return path;

  const base = import.meta.env.BASE_URL; // '/aniimo-guide/'

  return `${base}${path.replace(/^\//, "")}`;
}