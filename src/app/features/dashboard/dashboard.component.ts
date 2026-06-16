// src/app/features/dashboard-shell.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  RouterModule,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    MenuModule,
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    ProgressSpinnerModule,
  ],
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);

  public isDarkMode = signal<boolean>(true);
  public isRouteLoading = signal<boolean>(false); // State tracker for loading overlay
  public navigationItems: MenuItem[] = [];

  ngOnInit(): void {
    this.initializeNavigationMenu();
    this.monitorRoutingLifecycle();
  }

  private initializeNavigationMenu(): void {
    this.navigationItems = [
      {
        label: 'Navigation Streams',
        items: [
          {
            label: 'Live Stream',
            icon: 'pi pi-chart-line',
            routerLink: 'telemetry',
            routerLinkActiveOptions: { exact: true },
          },
          {
            label: 'Dispatch Wizard',
            icon: 'pi pi-send',
            routerLink: 'dispatch',
          },
          {
            label: 'Audit Logs',
            icon: 'pi pi-shield',
            routerLink: 'audit',
          },
        ],
      },
    ];
  }

  private monitorRoutingLifecycle(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isRouteLoading.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Delayed slightly by 100ms to avoid flashing on instant cached local navigation switches
        setTimeout(() => this.isRouteLoading.set(false), 100);
      }
    });
  }

  public toggleTheme(): void {
    this.isDarkMode.update((prev) => !prev);
    const rootElement = document.documentElement;
    if (this.isDarkMode()) {
      rootElement.classList.add('dark', 'p-dark');
    } else {
      rootElement.classList.remove('dark', 'p-dark');
    }
  }
}
