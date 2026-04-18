import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

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

      wsHost: '127.0.0.1',
      wsPort: 8080,
      forceTLS: false,
      enabledTransports: ['ws'],

      authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',

      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    });

    this.echo.connector.pusher.connection.bind('connected', () => {
      console.log('✅ REVERB CONNECTED SUCCESSFULLY');
    });

    this.echo.connector.pusher.connection.bind('error', (err: any) => {
      console.log('❌ REVERB ERROR:', err);
    });
  }
}