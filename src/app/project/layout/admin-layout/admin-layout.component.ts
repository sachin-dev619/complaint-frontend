import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.syncBodyScrollLock();
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    this.syncBodyScrollLock();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (typeof window !== 'undefined' && window.innerWidth >= 992) {
      this.closeSidebar();
    }
  }

  private syncBodyScrollLock(): void {
    if (typeof document === 'undefined') return;
    const mobile = window.matchMedia('(max-width: 991.98px)').matches;
    document.body.classList.toggle('admin-sidebar-open', mobile && this.sidebarOpen);
  }
}
