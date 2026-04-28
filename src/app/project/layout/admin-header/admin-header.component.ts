import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { EchoService } from 'src/app/_services/echo.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  notifications: any[] = [];
  unreadCount: number = 0;
  showNotifications: boolean = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private echoService: EchoService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.listenRealtime();
  }

  // 🔔 Load notifications from API
  loadNotifications() {
    this.api.get('admin/notifications')
      .subscribe((res: any) => {
        this.notifications = res;
        this.updateCount();
      });
  }

  // ⚡ Realtime listener
  listenRealtime() {

    this.echoService.echo
      .private('admin.notifications')
      .listen('.notification.created', (data: any) => {

        console.log('🔥 Realtime Admin:', data);

        this.ngZone.run(() => {
          this.notifications.unshift(data.notification);
          this.updateCount();
        });
      });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  updateCount() {
    this.unreadCount = this.notifications.filter(n => n.is_read == 0).length;
  }

  markAsRead(notification: any) {
    this.api.put(`notifications/${notification.id}/read`, {})
      .subscribe(() => {
        notification.is_read = 1;
        this.updateCount();
      });
  }

  markAllRead() {
    this.api.put(`notifications/read-all`, {})
      .subscribe(() => {
        this.notifications.forEach(n => n.is_read = 1);
        this.updateCount();
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}