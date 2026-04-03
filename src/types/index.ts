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

export type InterpretedAstralPositions = AstralElement[];
