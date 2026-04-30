import { environment } from 'src/environments/environment';

/** Builds a public URL for a path under Laravel `storage/app/public`. */
export function storageUrl(relativePath: string | null | undefined): string {
  if (relativePath == null || relativePath === '') {
    return '';
  }
  const p = String(relativePath).trim();
  if (p.startsWith('http://') || p.startsWith('https://')) {
    return p;
  }
  const base = `${environment.baseUrl}/storage`.replace(/\/$/, '');
  return `${base}/${p.replace(/^\/+/, '')}`;
}
