export type BroadcastingConfig =
  | {
      broadcaster: 'reverb';
      appKey: string;
      wsHost: string;
      wsPort: number;
      wssPort: number;
      forceTLS: boolean;
      /** Hostname only — use when Reverb has its own public URL on Railway (see echo.service / backend docs). */
      wsHostPublic?: string;
    }
  | {
      broadcaster: 'pusher';
      appKey: string;
      cluster: string;
      forceTLS: boolean;
    };

export interface EnvironmentConfig {
  production: boolean;
  apiUrl: string;
  baseUrl: string;
  broadcasting: BroadcastingConfig;
}
