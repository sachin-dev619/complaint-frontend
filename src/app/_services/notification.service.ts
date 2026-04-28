import { Injectable, NgZone } from '@angular/core';
import { EchoService } from './echo.service';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationsSubject = new BehaviorSubject<any[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor(
    private api: ApiService,
    private echoService: EchoService,
    private ngZone: NgZone
  ) {}

  // 🔔 Load notifications from API
  loadNotifications() {
    this.api.get('admin/notifications').subscribe((res: any) => {
      this.notificationsSubject.next(res);
    });
  }

  // ⚡ Listen realtime
  listenRealtime() {
    this.echoService.echo
      .private('admin.notifications')
      .listen('.notification.created', (data: any) => {

        console.log('🔥 Realtime:', data);

        this.ngZone.run(() => {
          const current = this.notificationsSubject.value;
          this.notificationsSubject.next([data.notification, ...current]);
        });
      });
  }

  // ✔ Mark single as read
  markAsRead(id: number) {
    return this.api.put(`notifications/${id}/read`, {});
  }

  // ✔ Mark all as read
  markAllRead() {
    return this.api.put(`notifications/read-all`, {});
  }
}
