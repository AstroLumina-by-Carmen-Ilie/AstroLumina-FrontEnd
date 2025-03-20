import axios from 'axios';
import { ReadingPayload, ReadingResult } from '../../../types/astralPositions';
import { InterpretedReadingResult } from '../../../types/astralChart';

const ASTROLOGICAL_API_URL = import.meta.env.VITE_ASTROLOGICAL_API_URL
export const calculateAstralPositions = async (language: string, payload: ReadingPayload): Promise<ReadingResult> => {
  try {
    const response = await axios.post(`${ASTROLOGICAL_API_URL}/api/v1/${language}/planet-sign-house`, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Failed to fetch reading');
  }
};

export const calculateNatalChart = async (language: string, payload: ReadingPayload): Promise<InterpretedReadingResult> => {
  try {
    const response = await axios.post(`${ASTROLOGICAL_API_URL}/api/v1/${language}/interpretations/natal`, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Failed to fetch reading');
  }
};

export const calculateKarmicChart = async (language: string, payload: ReadingPayload): Promise<InterpretedReadingResult> => {
  try {
    const response = await axios.post(`${ASTROLOGICAL_API_URL}/api/v1/${language}/interpretations/karmic`, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Failed to fetch reading');
  }
};