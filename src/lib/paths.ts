/** Prefix site-relative routes; leave external URLs and page fragments untouched. */
export function withBase(path: string, base = import.meta.env?.BASE_URL ?? '/') {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return base.replace(/\/$/, '') + path;
}
