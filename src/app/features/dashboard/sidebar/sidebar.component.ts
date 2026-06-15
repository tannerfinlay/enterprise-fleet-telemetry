import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [PanelModule, MenuModule, RouterLink],
})
export class SidebarComponent {
  menuItems = signal<MenuItem[]>([
    {
      label: 'Telemetry',
      icon: 'pi pi-fw pi-chart-line',
      routerLink: '/telemetry',
      routerLinkActiveOptions: { exact: true },
      active: true,
    },
    {
      label: 'Audit Log',
      icon: 'pi pi-fw pi-file',
      routerLink: '/audit-log',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Dispatch',
      icon: 'pi pi-fw pi-send',
      routerLink: '/dispatch',
      routerLinkActiveOptions: { exact: true },
    },
  ]);
}
