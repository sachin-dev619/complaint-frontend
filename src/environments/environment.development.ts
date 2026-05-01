import type { EnvironmentConfig } from './environment.model';

/**
 * Local Laravel (`php artisan serve`, :8000) + Reverb (`php artisan reverb:start`, :8080).
 * If you see ERR_CONNECTION_REFUSED to :8000, start the API or run:
 * `npm run start:remote` (uses Railway backend while debugging Angular).
 */
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
