export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  category: 'waterfalls' | 'hiking' | 'parks' | 'wildlife' | 'cultural';
  categoryLabels: string[];
  distanceKm: number;
  travelTime: string;
  locationDetails: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  studentPrice: string;
  regularPrice: string;
  studentPassVerified: boolean;
  priceBadgeType: 'gold' | 'mint';
  transitDetails: {
    stage: string;
    matatuFare: string;
    bodaFare?: string;
    connectionNotes: string;
    routeNumber?: string;
  };
  highlights: string[];
  guidelines: string[];
  contactPhone?: string;
  openingHours: string;
  coordinates?: { lat: number; lng: number };
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  type: 'event' | 'error' | 'vitals' | 'log';
  name: string;
  payload: Record<string, any>;
}

export interface WebVitalsState {
  lcp: number | null; // Largest Contentful Paint (ms)
  cls: number | null; // Cumulative Layout Shift (score)
  fid: number | null; // First Input Delay (ms)
  fcp: number | null; // First Contentful Paint (ms)
  ttfb: number | null; // Time to First Byte (ms)
}
