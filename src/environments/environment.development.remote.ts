import type { EnvironmentConfig } from './environment.model';
import { RAILWAY_BACKEND_ORIGIN } from './railway-backend-origin';

/** Same API/Reverb targets as production; use with `ng serve --configuration development-remote`. */
const origin = RAILWAY_BACKEND_ORIGIN;

export const environment = {
  production: false,
  apiUrl: `${origin}/api`,
  baseUrl: origin,
  broadcasting: {
    broadcaster: 'reverb',
    appKey: 'localkey',
    wsHost: new URL(origin).hostname,
    wsPort: 80,
    wssPort: 443,
    forceTLS: true,
  },
} satisfies EnvironmentConfig;
