import type { EnvironmentConfig } from './environment.model';

/** Local Laravel (`php artisan serve`) + Reverb (`php artisan reverb:start`). */
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api',
  baseUrl: 'http://127.0.0.1:8000',
  broadcasting: {
    broadcaster: 'reverb',
    appKey: 'localkey',
    wsHost: '127.0.0.1',
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: false,
  },
} satisfies EnvironmentConfig;
