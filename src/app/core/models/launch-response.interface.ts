export interface LL2LaunchResponse {
  count: number;
  results: Array<{
    id: string;
    name: string;
    status: { id: number; name: string; abbrev: string; description: string };
    net: string; // ISO Date String
    launch_service_provider: { id: number; name: string; type: string };
    rocket: { configuration: { id: number; name: string; family: string } };
    pad: { name: string; location: { name: string } };
    probability: number | null;
  }>;
}
