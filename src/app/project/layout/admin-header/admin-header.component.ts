import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EchoService } from 'src/app/_services/echo.service';

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
    private http: HttpClient,
    private echoService: EchoService,
    private ngZone: NgZone // ✅ IMPORTANT
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.listenRealtime();
  }

  // 🔔 Load from DB
  loadNotifications() {
    this.http.get('http://127.0.0.1:8000/api/admin/notifications')
      .subscribe((res: any) => {
        this.notifications = res;
        this.updateCount();
      });
  }

  // ⚡ ✅ FIXED REALTIME LISTENER
  listenRealtime() {

    this.echoService.echo
      .private('admin.notifications') // ✅ FIX HERE
      .listen('.notification.created', (data: any) => {

        console.log('🔥 Realtime Admin:', data);

        // ✅ Angular UI refresh fix
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
    this.http.put(
      `http://127.0.0.1:8000/api/notifications/${notification.id}/read`,
      {}
    ).subscribe(() => {
      notification.is_read = 1;
      this.updateCount();
    });
  }

  markAllRead() {
    this.http.put(
      `http://127.0.0.1:8000/api/notifications/read-all`,
      {}
    ).subscribe(() => {
      this.notifications.forEach(n => n.is_read = 1);
      this.updateCount();
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}