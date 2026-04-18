import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
  openMenu: string = '';
  isOpen = false;

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? '' : menu;
  }

}
