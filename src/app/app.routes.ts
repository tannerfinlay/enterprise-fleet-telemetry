import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    children: [
      {
        path: '',
        redirectTo: 'telemetry',
        pathMatch: 'full',
      },
      {
        path: 'telemetry',
        loadComponent: () => import('./features/telemetry/telemetry.component').then((m) => m.TelemetryComponent),
      },
      {
        path: 'dispatch',
        loadComponent: () => import('./features/dispatch/dispatch.component').then((m) => m.DispatchComponent),
      },
      {
        path: 'audit',
        loadComponent: () => import('./features/audit-log/audit-log.component').then((m) => m.AuditLogComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'telemetry',
  },
];
