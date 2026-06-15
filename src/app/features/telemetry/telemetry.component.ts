import { Component, computed, effect, inject } from '@angular/core';
import { LaunchTelemetryService, ThemeService } from '../../core/services';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrl: './telemetry.component.css',
  imports: [ChartModule],
})
export class TelemetryComponent {
  telemetryService = inject(LaunchTelemetryService);
  private readonly themeService = inject(ThemeService);

  isDarkMode = computed(() => this.themeService.isDarkMode());

  chartOptions = computed(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.isDarkMode()
      ? documentStyle.getPropertyValue('--p-surface-600')
      : documentStyle.getPropertyValue('--p-slate-300');
    return {
      plugins: {
        legend: {
          display: true,
          labels: { color: textColor },
        },
      },
      scales: {
        x: {
          grid: { color: 'var(--p-surface-800)', drawBorder: false },
          ticks: { color: 'var(--p-surface-400)' },
        },
        y: {
          grid: { color: 'var(--p-surface-800)', drawBorder: false },
          ticks: { color: 'var(--p-surface-400)', min: 0, max: 100 },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  });

  constructor() {
    effect(() => {
      const activeCount = this.telemetryService.totalMissions();
      if (activeCount > 0) {
        console.log(
          `[System Monitor] Global Stream updated. Tracking ${activeCount} active operations via LL2 standard vectors.`,
        );
      }
    });
  }
}
