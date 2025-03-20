import { FormErrors, SelectOption } from './common';

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface ReadingPayload {
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

export interface AstralPosition {
  name: string;
  quality: string;
  element: string;
  sign: string;
  sign_num: number;
  position: number;
  abs_pos: number;
  emoji: string;
  point_type: string;
  house: string;
  retrograde: boolean;
}

export interface ReadingResult {
  data: AstralPosition[];
}

export type { FormErrors, SelectOption };