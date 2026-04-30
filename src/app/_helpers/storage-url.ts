import { resolveBaseUrl } from 'src/app/_helpers/runtime-config';

/** Builds a public URL for a path under Laravel `storage/app/public`. */
export function storageUrl(relativePath: string | null | undefined): string {
  if (relativePath == null || relativePath === '') {
    return '';
  }
  const p = String(relativePath).trim();
  if (p.startsWith('http://') || p.startsWith('https://')) {
    return p;
  }
  const base = `${resolveBaseUrl()}/storage`.replace(/\/$/, '');
  return `${base}/${p.replace(/^\/+/, '')}`;
}
