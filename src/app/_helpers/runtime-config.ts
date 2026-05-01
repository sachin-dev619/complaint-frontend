import { environment } from 'src/environments/environment';

const RAILWAY_ORIGIN = 'https://complaint-system-production-78d7.up.railway.app';

function currentHost(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.location.hostname;
}

function isLocalHost(host: string): boolean {
  return host === 'localhost' || host === '127.0.0.1';
}

function sanitizeOrigin(origin: string): string {
  return origin.replace(/\/+$/, '');
}

export function resolveBaseUrl(): string {
  const configured = sanitizeOrigin(environment.baseUrl);
  const host = currentHost();

  // If frontend runs on Vercel/production domain, never use localhost backend.
  if (!isLocalHost(host) && /127\.0\.0\.1|localhost/.test(configured)) {
    return RAILWAY_ORIGIN;
  }

  return configured;
}

export function resolveApiUrl(): string {
  const configured = sanitizeOrigin(environment.apiUrl);
  const host = currentHost();

  if (!isLocalHost(host) && /127\.0\.0\.1|localhost/.test(configured)) {
    return `${RAILWAY_ORIGIN}/api`;
  }

  return configured;
}
