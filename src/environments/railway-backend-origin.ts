/**
 * Shared Laravel HTTP API origin (Railway).
 *
 * If Reverb WebSockets use a **different** public hostname than this URL, set
 * `broadcasting.wsHostPublic` in `environment.ts` / `environment.development.remote.ts`
 * to that hostname only (no `https://`).
 */
export const RAILWAY_BACKEND_ORIGIN =
  'https://complaint-system-production-78d7.up.railway.app';
