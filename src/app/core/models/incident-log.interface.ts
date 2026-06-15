export interface IncidentLog {
  id: string;
  timestamp: string;
  subsystem: 'PROPULSION' | 'AVIONICS' | 'TELEMETRY' | 'LIFE_SUPPORT';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  payloadVector: string;
  resolved: boolean;
}
