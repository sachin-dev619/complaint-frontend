import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit, OnDestroy {
  @Input() mobileOpen = false;
  @Output() closeMobileSidebar = new EventEmitter<void>();

  openMenu: string = '';

  private navSub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.closeMobileSidebar.emit());
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
  }

  toggleMenu(menu: string): void {
    this.openMenu = this.openMenu === menu ? '' : menu;
  }
}
