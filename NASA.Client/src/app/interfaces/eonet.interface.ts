export interface EventGeometry {
  date: string;
  type: string;
  coordinates: [number, number];
  isGame: boolean;
}

export interface EventCategory {
  id: number;
  title: string;
}

export interface EventSource {
  id: string;
  url: string;
}

export interface EonetEvent {
  id: string;
  title: string;
  description: string;
  link: string;
  categories: EventCategory[];
  sources: EventSource[];
  geometries: EventGeometry[];
}

export interface EonetApiResponse {
  title: string;
  description: string;
  link: string;
  events: EonetEvent[];
}
