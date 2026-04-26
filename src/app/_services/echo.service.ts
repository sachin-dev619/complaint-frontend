import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';

(window as any).Pusher = Pusher;

@Injectable({
  providedIn: 'root'
})
export class EchoService {

  public echo: Echo<any>;

  constructor() {

    this.echo = new Echo<any>({
      broadcaster: 'reverb',
      key: 'localkey',

      // ✅ Dynamic host (works for both local & production)
      wsHost: new URL(environment.baseUrl).hostname,
      wsPort: 443,
      forceTLS: true,

      enabledTransports: ['ws', 'wss'],

      // ✅ Dynamic auth endpoint
      authEndpoint: `${environment.baseUrl}/broadcasting/auth`,

      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    });

    // ✅ Connection success
    this.echo.connector.pusher.connection.bind('connected', () => {
      console.log('✅ REVERB CONNECTED SUCCESSFULLY');
    });

    // ❌ Error handling
    this.echo.connector.pusher.connection.bind('error', (err: any) => {
      console.error('❌ REVERB ERROR:', err);
    });
  }
}