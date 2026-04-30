export type BroadcastingConfig =
  | {
      broadcaster: 'reverb';
      appKey: string;
      wsHost: string;
      wsPort: number;
      wssPort: number;
      forceTLS: boolean;
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
