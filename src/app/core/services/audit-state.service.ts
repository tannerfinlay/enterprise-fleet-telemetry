import { computed, Service, signal } from '@angular/core';
import { IncidentLog } from '../models';

@Service()
export class AuditStateService {
  // Mock Data representing system warnings
  private _initialLogs: IncidentLog[] = [
    {
      id: 'ERR-901',
      timestamp: '2026-06-15 22:01:05',
      subsystem: 'PROPULSION',
      severity: 'CRITICAL',
      message: 'Main valve regulator pressure variance exceeds nominal bounds',
      payloadVector: '0x77AF32',
      resolved: false,
    },
    {
      id: 'WRN-402',
      timestamp: '2026-06-15 21:54:12',
      subsystem: 'TELEMETRY',
      severity: 'WARNING',
      message: 'High packet degradation rate on downstream LL2 relay nodes',
      payloadVector: '0x12CC4B',
      resolved: true,
    },
    {
      id: 'ERR-104',
      timestamp: '2026-06-15 20:30:44',
      subsystem: 'AVIONICS',
      severity: 'CRITICAL',
      message: 'Inertial Measurement Unit loss of alignment during static vector check',
      payloadVector: '0x9900FF',
      resolved: false,
    },
    {
      id: 'INF-012',
      timestamp: '2026-06-15 19:12:01',
      subsystem: 'LIFE_SUPPORT',
      severity: 'INFO',
      message: 'Environmental control carbon scrubber loop cycle reset complete',
      payloadVector: '0x44BBAA',
      resolved: true,
    },
  ];

  // Core State Holders using private writeable signals
  private logsState = signal<IncidentLog[]>(this._initialLogs);
  private searchQueryState = signal<string>('');

  // Selected detail state node
  selectedIncident = signal<IncidentLog | null>(null);

  // Derived state reading directly out of reactive criteria
  filteredLogs = computed(() => {
    const logs = this.logsState();
    const query = this.searchQueryState().toLowerCase().trim();

    if (!query) return logs;
    return logs.filter(
      (log) =>
        log.id.toLowerCase().includes(query) ||
        log.message.toLowerCase().includes(query) ||
        log.subsystem.toLowerCase().includes(query),
    );
  });

  updateSearchQuery(query: string): void {
    this.searchQueryState.set(query);

    // Auto-close detail view if the currently viewed card gets filtered out
    const currentSelection = this.selectedIncident();
    if (currentSelection && !this.filteredLogs().some((l) => l.id === currentSelection.id)) {
      this.selectedIncident.set(null);
    }
  }

  selectIncident(incident: IncidentLog): void {
    this.selectedIncident.set(incident);
  }

  closeIncidentDetails(): void {
    this.selectedIncident.set(null);
  }
}
