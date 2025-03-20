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

export interface InterpretedAstralPosition extends AstralPosition {
    interpretation: string;
}

export type InterpretedAstralPositions = InterpretedAstralPosition[];

export type { FormErrors, SelectOption };
export type { LocationCoordinates, BirthDataPayload, AstralPosition, AstralPositions };
