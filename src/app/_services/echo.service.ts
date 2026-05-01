import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';
import type { BroadcastingConfig } from 'src/environments/environment.model';
import { resolveBaseUrl } from 'src/app/_helpers/runtime-config';

(window as any).Pusher = Pusher;

@Injectable({
  providedIn: 'root',
})
export class EchoService {
  public echo: Echo<any>;

  constructor() {
    const bc = environment.broadcasting as BroadcastingConfig;
    const rawBc = environment.broadcasting as Record<string, unknown>;
    const baseUrl = resolveBaseUrl();
    const baseHost = new URL(baseUrl).hostname;

    if (bc.broadcaster === 'reverb') {
      this.echo = new Echo({
        broadcaster: 'reverb',
        key: bc.appKey,
        wsHost: bc.wsHost === '127.0.0.1' || bc.wsHost === 'localhost' ? baseHost : bc.wsHost,
        wsPort: bc.wsPort,
        wssPort: bc.wssPort,
        forceTLS: bc.forceTLS,
        enabledTransports: ['ws', 'wss'],
        disableStats: true,
        authEndpoint: `${baseUrl}/broadcasting/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });
    } else {
      this.echo = new Echo({
        broadcaster: 'pusher',
        key: String(rawBc['appKey'] ?? ''),
        cluster: String(rawBc['cluster'] ?? ''),
        forceTLS: Boolean(rawBc['forceTLS']),
        authEndpoint: `${baseUrl}/broadcasting/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });
    }

    this.echo.connector.pusher.connection.bind('connected', () => {
      console.log('Pusher/Reverb connected');
    });

    this.echo.connector.pusher.connection.bind('error', (err: unknown) => {
      console.error('Broadcast connection error:', err);
    });
  }
}
