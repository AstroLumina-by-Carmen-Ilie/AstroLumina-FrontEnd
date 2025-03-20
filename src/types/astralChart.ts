import { FormErrors, SelectOption } from './common';
import { LocationCoordinates, ReadingPayload, AstralPosition, ReadingResult } from './astralPositions';

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

export interface InterpretedAstralPosition extends AstralPosition {
    interpretation: string;
}

export type { FormErrors, SelectOption };
export type { LocationCoordinates, ReadingPayload, AstralPosition, ReadingResult };
