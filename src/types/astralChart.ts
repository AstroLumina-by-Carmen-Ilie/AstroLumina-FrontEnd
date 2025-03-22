import { FormErrors, SelectOption } from './common';
import { LocationCoordinates, BirthDataPayload, AstralPosition, AstralPositions } from './astralPositions';

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

export interface InterpretedAstralPosition {
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
    interpretation: string;
}

export type InterpretedAstralPositions = InterpretedAstralPosition[];

export type { FormErrors, SelectOption };
export type { LocationCoordinates, BirthDataPayload, AstralPosition, AstralPositions };
