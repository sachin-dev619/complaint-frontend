import type { EnvironmentConfig } from './environment.model';

/** Production defaults — must match Laravel `.env` (`PUSHER_APP_KEY`, Reverb / broadcasting). */
const origin = 'https://complaint-system-production-78d7.up.railway.app';

export const environment = {
  production: true,
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
