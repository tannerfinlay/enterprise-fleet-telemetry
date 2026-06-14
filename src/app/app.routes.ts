import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/telemetry',
    pathMatch: 'full',
  },
  {
    path: 'telemetry',
    loadComponent: () =>
      import('./features/telemetry/telemetry.component').then((m) => m.TelemetryComponent),
  },
  {
    path: 'dispatch',
    loadComponent: () =>
      import('./features/dispatch/dispatch.component').then((m) => m.DispatchComponent),
  },
  {
    path: 'audit-log',
    loadComponent: () =>
      import('./features/audit-log/audit-log.component').then((m) => m.AuditLogComponent),
  },
];
