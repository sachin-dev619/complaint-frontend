import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';

(window as any).Pusher = Pusher;

@Injectable({
  providedIn: 'root',
})
export class EchoService {
  public echo: Echo<any>;

  constructor() {
    const bc = environment.broadcasting;

    if (bc.broadcaster === 'reverb') {
      this.echo = new Echo({
        broadcaster: 'reverb',
        key: bc.appKey,
        wsHost: bc.wsHost,
        wsPort: bc.wsPort,
        wssPort: bc.wssPort,
        forceTLS: bc.forceTLS,
        enabledTransports: ['ws', 'wss'],
        disableStats: true,
        authEndpoint: `${environment.baseUrl}/broadcasting/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });
    } else {
      this.echo = new Echo({
        broadcaster: 'pusher',
        key: bc.appKey,
        cluster: bc.cluster,
        forceTLS: bc.forceTLS,
        authEndpoint: `${environment.baseUrl}/broadcasting/auth`,
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
