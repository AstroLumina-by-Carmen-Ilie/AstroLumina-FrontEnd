import axios from 'axios';
import { BirthDataPayload, AstralPositions } from '../../../types/astralPositions';
import { InterpretedAstralPositions } from '../../../types/astralChart';

const ASTROLOGICAL_API_URL = import.meta.env.VITE_ASTROLOGICAL_API_URL
export const calculateAstralPositions = async (language: string, payload: BirthDataPayload): Promise<AstralPositions> => {
  try {
    const options = {
      method: 'POST',
      url: `${ASTROLOGICAL_API_URL}/api/v1/${language}/astral-data`,
      headers: {
        'Accept-Language': language,
        'Content-Type': 'application/json'
      },
      data: payload
    };

    const response = await axios.request(options);

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Failed to fetch reading');
  }
};

export const calculateNatalChart = async (language: string, payload: BirthDataPayload): Promise<InterpretedAstralPositions> => {
  try {
    const options = {
      method: 'POST',
      url: `${ASTROLOGICAL_API_URL}/api/v1/${language}/astral-interpretations/natal`,
      headers: {
        'Accept-Language': language,
        'Content-Type': 'application/json'
      },
      data: payload
    };

    const response = await axios.request(options);

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Failed to fetch reading');
  }
};

export const calculateKarmicChart = async (language: string, payload: BirthDataPayload): Promise<InterpretedAstralPositions> => {
  try {
    const options = {
      method: 'POST',
      url: `${ASTROLOGICAL_API_URL}/api/v1/${language}/astral-interpretations/karmic`,
      headers: {
        'Accept-Language': language,
        'Content-Type': 'application/json'
      },
      data: payload
    };

    const response = await axios.request(options);

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Failed to fetch reading');
  }
};