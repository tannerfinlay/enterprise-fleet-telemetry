// src/app/features/dashboard-shell.component.ts
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelemetryComponent } from '../telemetry/telemetry.component';
import { DispatchComponent } from '../dispatch/dispatch.component';
import { AuditLogComponent } from '../audit-log/audit-log.component';

type ActiveTab = 'telemetry' | 'dispatch' | 'audit';

@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [CommonModule, TelemetryComponent, DispatchComponent, AuditLogComponent],
  template: `
    <div
      class="min-h-screen flex bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-50 transition-colors duration-300"
    >
      <aside
        class="w-20 md:w-64 border-r border-surface-200 dark:border-surface-800 bg-surface-0 dark:bg-surface-900 flex flex-col justify-between transition-all duration-300 z-20"
      >
        <div>
          <div class="h-16 flex items-center gap-3 px-4 md:px-6 border-b border-surface-200 dark:border-surface-800">
            <div
              class="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black tracking-wider shadow-md shadow-emerald-600/20"
            >
              FT
            </div>
            <span
              class="hidden md:inline font-bold text-sm tracking-tight uppercase text-surface-800 dark:text-surface-100"
            >
              Fleet Telemetry
            </span>
          </div>

          <nav class="p-3 space-y-1.5">
            <button
              (click)="setActiveTab('telemetry')"
              [ngClass]="
                activeTab() === 'telemetry'
                  ? 'bg-emerald-500/10 text-emerald-500 font-semibold'
                  : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-950 hover:text-surface-800 dark:hover:text-surface-200'
              "
              class="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group"
            >
              <i class="pi pi-chart-line text-lg group-hover:scale-105 transition-transform"></i>
              <span class="hidden md:inline">Live Stream</span>
            </button>

            <button
              (click)="setActiveTab('dispatch')"
              [ngClass]="
                activeTab() === 'dispatch'
                  ? 'bg-emerald-500/10 text-emerald-500 font-semibold'
                  : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-950 hover:text-surface-800 dark:hover:text-surface-200'
              "
              class="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group"
            >
              <i class="pi pi-send text-lg group-hover:scale-105 transition-transform"></i>
              <span class="hidden md:inline">Dispatch Wizard</span>
            </button>

            <button
              (click)="setActiveTab('audit')"
              [ngClass]="
                activeTab() === 'audit'
                  ? 'bg-emerald-500/10 text-emerald-500 font-semibold'
                  : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-950 hover:text-surface-800 dark:hover:text-surface-200'
              "
              class="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group"
            >
              <i class="pi pi-shield text-lg group-hover:scale-105 transition-transform"></i>
              <span class="hidden md:inline">Audit Logs</span>
            </button>
          </nav>
        </div>

        <div class="p-4 border-t border-surface-200 dark:border-surface-800">
          <button
            (click)="toggleTheme()"
            class="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2 text-xs font-medium rounded-md text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 transition-colors"
          >
            <i [ngClass]="isDarkMode() ? 'pi pi-sun text-amber-500' : 'pi pi-moon text-blue-500'" class="text-md"></i>
            <span class="hidden md:inline uppercase tracking-wider">{{
              isDarkMode() ? 'Light Aspect' : 'Dark Aspect'
            }}</span>
          </button>
        </div>
      </aside>

      <div class="flex-1 flex flex-col min-w-0">
        <header
          class="h-16 border-b border-surface-200 dark:border-surface-800 bg-surface-0 dark:bg-surface-900 flex items-center justify-between px-6 z-10 shadow-sm"
        >
          <div class="flex items-center gap-2">
            <span
              class="text-xs font-semibold px-2 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 font-mono"
              >NODE-01</span
            >
            <span class="text-xs text-surface-400">/</span>
            <span class="text-xs font-medium text-surface-500 capitalize tracking-wide"
              >{{ activeTab() }} Control Matrix</span
            >
          </div>
          <div class="flex items-center gap-4">
            <div class="flex flex-col text-right hidden sm:flex">
              <span class="text-xs font-bold text-surface-800 dark:text-surface-200">Security Proxy Account</span>
              <span class="text-[10px] font-mono text-emerald-500">ASYNCHRONOUS-CONTRACTOR-ROLE</span>
            </div>
            <div
              class="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-800 border border-surface-300 dark:border-surface-700 flex items-center justify-center text-xs font-bold text-surface-600 dark:text-surface-300"
            >
              SC
            </div>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto p-6 md:p-8">
          <div class="max-w-7xl mx-auto">
            @switch (activeTab()) {
              @case ('telemetry') {
                <app-telemetry />
              }
              @case ('dispatch') {
                <app-dispatch />
              }
              @case ('audit') {
                <app-audit-log />
              }
            }
          </div>
        </main>
      </div>
    </div>
  `,
})
export class DashboardShellComponent {
  // Application architecture internal core states driven via writeable signals
  public activeTab = signal<ActiveTab>('telemetry');
  public isDarkMode = signal<boolean>(true); // Default to Dark-Mode First strategy

  public setActiveTab(tab: ActiveTab): void {
    this.activeTab.set(tab);
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
