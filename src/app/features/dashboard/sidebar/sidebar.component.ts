import { Component, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [PanelModule, MenuModule],
})
export class SidebarComponent {
  menuItems = signal<MenuItem[]>([
    { label: 'Telemetry', icon: 'pi pi-fw pi-chart-line', routerLink: '/telemetry' },
    { label: 'Audit Log', icon: 'pi pi-fw pi-file', routerLink: '/audit-log' },
    { label: 'Dispatch', icon: 'pi pi-fw pi-send', routerLink: '/dispatch' },
  ]);
}
