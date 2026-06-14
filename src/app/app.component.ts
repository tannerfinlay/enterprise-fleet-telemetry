import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './features/dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './features/dashboard/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
})
export class App {
  protected readonly title = signal('enterprise-fleet-telemetry');
}
