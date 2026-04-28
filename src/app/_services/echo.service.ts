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

    this.echo = new Echo({
      broadcaster: 'pusher', // ✅ FIXED

      key: '450a44787be66a6cc6ec', // ✅ your pusher key
      cluster: 'ap2', // ✅ your cluster

      forceTLS: true, // ✅ required for Railway (HTTPS)

      // ✅ Auth endpoint (important for private channels)
      authEndpoint: `${environment.baseUrl}/broadcasting/auth`,

      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    });

    // ✅ Success log
    this.echo.connector.pusher.connection.bind('connected', () => {
      console.log('✅ PUSHER CONNECTED SUCCESSFULLY');
    });

    // ❌ Error log
    this.echo.connector.pusher.connection.bind('error', (err: any) => {
      console.error('❌ PUSHER ERROR:', err);
    });
  }
}