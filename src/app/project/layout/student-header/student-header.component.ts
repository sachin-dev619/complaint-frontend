import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  HostListener,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.scss']
})
export class StudentHeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  notifications: any[] = [];
  unreadCount = 0;
  showNotifications = false;
  loadingNotifications = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
    private host: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.showNotifications) return;
    if (!this.host.nativeElement.contains(event.target)) {
      this.showNotifications = false;
    }
  }

  loadNotifications() {
    this.loadingNotifications = true;
    this.api.get('notifications').subscribe({
      next: (res: any) => {
        this.notifications = Array.isArray(res) ? res : (res?.data || []);
        this.updateCount();
        this.loadingNotifications = false;
      },
      error: () => {
        this.loadingNotifications = false;
      }
    });
  }

  toggleNotifications(event?: Event) {
    event?.stopPropagation();
    this.showNotifications = !this.showNotifications;
  }

  updateCount() {
    this.unreadCount = this.notifications.filter(n => n.is_read == 0 || n.is_read === false).length;
  }

  get badgeLabel(): string {
    return this.unreadCount > 9 ? '9+' : String(this.unreadCount);
  }

  markAsRead(notification: any, event?: Event) {
    event?.stopPropagation();
    if (notification.is_read == 1 || notification.is_read === true) return;

    this.api.put(`notifications/${notification.id}/read`, {}).subscribe({
      next: () => {
        notification.is_read = 1;
        this.updateCount();
      }
    });
  }

  markAllRead(event?: Event) {
    event?.stopPropagation();
    if (this.unreadCount === 0) return;

    this.api.put(`notifications/read-all`, {}).subscribe({
      next: () => {
        this.notifications.forEach(n => (n.is_read = 1));
        this.updateCount();
      }
    });
  }

  notificationIcon(n: any): string {
    const title = (n?.title || '').toLowerCase();
    if (title.includes('submit') || title.includes('received')) return 'bi-send-check-fill';
    if (title.includes('status') || title.includes('updated')) return 'bi-arrow-repeat';
    if (title.includes('resolv')) return 'bi-check-circle-fill';
    return 'bi-bell-fill';
  }

  relativeTime(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  }

  goToComplaints() {
    this.showNotifications = false;
    this.router.navigate(['/student/my-complaints']);
  }

  logout(): void {
    this.auth.logout().subscribe({
      next: () => this.finishLogout(),
      error: () => this.finishLogout()
    });
  }

  private finishLogout(): void {
    this.auth.clearSession();
    this.router.navigate(['/login']);
  }
}
