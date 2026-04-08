export interface ConstelationEvent {
  title: string;
  date: Date;
  time: string;
  location: string;
  price: string;
}

export interface FormErrors {
    [key: string]: string;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface BirthDataPayload {
  longitude: number;
  latitude: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  city: string;
  nation: string;
  name: string;
}

export interface LunarDataPayload {
  longitude: number;
  latitude: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  city?: string;
  nation?: string;
}

export interface AstralElement {
  name: string;
  element: string;
  sign: string;
  position: number;
  emoji: string;
  symbol?: string;
  point_type?: string;
  house?: string;
  retrograde?: boolean;
  description?: string;
}

export type AstralElements = AstralElement[];

export interface UserInfo {
    name: string;
    birthDate: Date;
    birthHour: Date;
    location: string;
}

export interface ContactInfo {
    phone: string;
    email: string;
}

export type InterpretedAstralElements = AstralElement[];

export interface LunarDataResponse {
    timestamp: number;
    datestamp: string;
    sun: {
        sunrise: number;
        sunrise_timestamp: string;
        sunset: number;
        sunset_timestamp: string;
        solar_noon: string;
        day_length: string;
        position: {
            altitude: number;
            azimuth: number;
            distance: number;
        };
        next_solar_eclipse: {
            timestamp: number;
            datestamp: string;
            type: string;
            visibility_regions: string | null;
        } | null;
    };
    moon: {
        phase: number;
        phase_name: string;
        major_phase: string;
        stage: string;
        illumination: string;
        age_days: number;
        lunar_cycle: string;
        emoji: string;
        zodiac: {
            sun_sign: string;
            moon_sign: string;
        };
        moonrise: string | null;
        moonrise_timestamp: string | null;
        moonset: string | null;
        moonset_timestamp: string | null;
        next_lunar_eclipse: {
            timestamp: number;
            datestamp: string;
            type: string;
            visibility_regions: string | null;
        } | null;
        detailed: {
            position: string | null;
            visibility: string | null;
            upcoming_phases: {
                new_moon: {
                    last: {
                        timestamp: number;
                        datestamp: string;
                        days_ago: number | null;
                        days_ahead: number | null;
                        name: string | null;
                        description: string | null;
                    };
                    next: {
                        timestamp: number;
                        datestamp: string;
                        days_ago: number | null;
                        days_ahead: number | null;
                        name: string | null;
                        description: string | null;
                    };
                };
                first_quarter: {
                    last: {
                        timestamp: number;
                        datestamp: string;
                        days_ago: number | null;
                        days_ahead: number | null;
                        name: string | null;
                        description: string | null;
                    };
                    next: {
                        timestamp: number;
                        datestamp: string;
                        days_ago: number | null;
                        days_ahead: number | null;
                        name: string | null;
                        description: string | null;
                    };
                };
                full_moon: {
                    last: {
                        timestamp: number;
                        datestamp: string;
                        days_ago: number | null;
                        days_ahead: number | null;
                        name: string | null;
                        description: string | null;
                    };
                    next: {
                        timestamp: number;
                        datestamp: string;
                        days_ago: number | null;
                        days_ahead: number | null;
                        name: string | null;
                        description: string | null;
                    };
                };
                last_quarter: {
                    last: {
                        timestamp: number;
                        datestamp: string;
                        days_ago: number | null;
                        days_ahead: number | null;
                        name: string | null;
                        description: string | null;
                    };
                    next: {
                        timestamp: number;
                        datestamp: string;
                        days_ago: number | null;
                        days_ahead: number | null;
                        name: string | null;
                        description: string | null;
                    };
                };
            };
            illumination_details: {
                percentage: number;
                visible_fraction: number;
                phase_angle: number;
            };
        };
        events: string | null;
    };
    location: {
        latitude: string;
        longitude: string;
        precision: number;
        using_default_location: boolean;
        note: string | null;
    };
}
