import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './features/dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './features/dashboard/header/header.component';
import { DashboardShellComponent } from './features/dashboard/dashboard-shell.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, DashboardShellComponent],
})
export class App {
  protected readonly title = signal('enterprise-fleet-telemetry');
}
