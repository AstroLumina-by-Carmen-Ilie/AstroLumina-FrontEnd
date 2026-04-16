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

export interface AstralAspect {
  p1_name: string;
  p2_name: string;
  aspect: string;
  orbit?: number;
  [key: string]: unknown;
}

export type AstralAspects = AstralAspect[];

export interface UserInfo {
    name: string;
    birthDate: Date;
    birthHour: Date;
    location: string;
    birthCity?: string;
    birthCounty?: string;
    birthCountry?: string;
}

export interface ContactInfo {
    phone: string;
    email: string;
}

export interface BookingQuestions {
    notes: string;
}

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

export interface AvailableSlot {
  time: string;
  date: string;
  timezone: string;
}

export interface AvailabilitySelectorProps {
  initialValues?: AvailableSlot;
  onNext: (selectedSlot: AvailableSlot) => void;
  onBack: () => void;
}

export interface BirthDataFormProps {
  initialValues?: {
    payload: BirthDataPayload;
    userInfo: UserInfo;
  };
  onNext: (payload: BirthDataPayload, userInfo: UserInfo) => void;
}

export interface BookingQuestionsFormProps {
  initialValues?: BookingQuestions;
  onNext: (questions: BookingQuestions) => void;
  onBack: () => void;
}

export interface ConfirmationStepProps {
  payload: BirthDataPayload;
  userInfo: UserInfo;
  contactInfo: ContactInfo;
  bookingQuestions: BookingQuestions;
  selectedSlot: AvailableSlot;
  paymentIntentId: string;
  onBack: () => void;
  onComplete: () => void;
}

export interface OnePersonBookingResponse {
  booking: {
    uid: string;
    eventTypeId: number;
    title: string;
    startTime: string;
    endTime: string;
    attendees: [
      {
        name: string;
        phoneNumber: string;
        email: string;
        timeZone: string;
        [key: string]: unknown;
      },
    ];
    status: string;
    location: string;
    bookingFieldsResponses: {
      "birth-date": string;
      "birth-place": string;
      "birth-time": string;
      notes: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
}

export interface TwoPersonsBookingResponse {
  booking: {
    uid: string;
    eventTypeId: number;
    title: string;
    startTime: string;
    endTime: string;
    attendees: [
      {
        name: string;
        phoneNumber: string;
        email: string;
        timeZone: string;
        [key: string]: unknown;
      },
    ];
    status: string;
    location: string;
    bookingFieldsResponses: {
      "first_member_data": string;
      "second_member_data": string;
      notes: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
}

export interface ContactFormProps {
  initialValues?: ContactInfo;
  onNext: (contactInfo: ContactInfo) => void;
  onBack: () => void;
}

export interface PaymentFormProps {
  selectedSlot?: AvailableSlot;
  existingPaymentIntentId?: string;
  onNext: (paymentIntentId: string) => void;
  onBack: () => void;
}
