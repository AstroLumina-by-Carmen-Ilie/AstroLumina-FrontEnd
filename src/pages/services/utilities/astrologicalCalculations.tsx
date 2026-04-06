import axios from 'axios';
import { BirthDataPayload, AstralElements } from '../../../types';
import { InterpretedAstralElements } from '../../../types';

const ASTROLOGICAL_API_URL = import.meta.env.VITE_ASTROLOGICAL_API_URL
export const calculateAstralElementsPosition = async (language: string, payload: BirthDataPayload):
  Promise<{astral_elements: AstralElements, astral_houses: AstralElements}> => {
  try {
    const options = {
      method: 'POST',
      url: `${ASTROLOGICAL_API_URL}/api/v2/${language}/astral-data`,
      headers: {
        'Accept-Language': language,
        'Content-Type': 'application/json'
      },
      data: payload
    };

    const response = await axios.request(options);

    return {
      astral_elements: response.data.cosmic_elements,
      astral_houses: response.data.cosmic_houses
    };
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Failed to fetch reading');
  }
};

export const calculateNatalChart = async (language: string, payload: BirthDataPayload):
  Promise<{ data: InterpretedAstralElements, chart: string }> => {
  try {
    const options_data = {
      method: 'POST',
      url: `${ASTROLOGICAL_API_URL}/api/v2/${language}/astral-data/natal`,
      headers: {
        'Accept-Language': language,
        'Content-Type': 'application/json'
      },
      data: payload
    };

    const response_data = await axios.request(options_data);

    const options_chart = {
      method: 'POST',
      url: `${ASTROLOGICAL_API_URL}/api/v2/${language}/astral-chart`,
      headers: {
        'Accept-Language': language,
        'Content-Type': 'application/json'
      },
      data: payload
    };

    const response_chart = await axios.request(options_chart);

    return {
      data: response_data.data,
      chart: response_chart.data
    };
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Failed to fetch reading');
  }
};

export const calculateKarmicChart = async (language: string, payload: BirthDataPayload):
  Promise<{ data: InterpretedAstralElements, chart: string }> => {
  try {
    const options_data = {
      method: 'POST',
      url: `${ASTROLOGICAL_API_URL}/api/v2/${language}/astral-data/karmic`,
      headers: {
        'Accept-Language': language,
        'Content-Type': 'application/json'
      },
      data: payload
    };

    const response_data = await axios.request(options_data);

    const options_chart = {
      method: 'POST',
      url: `${ASTROLOGICAL_API_URL}/api/v2/${language}/astral-chart`,
      headers: {
        'Accept-Language': language,
        'Content-Type': 'application/json'
      },
      data: payload
    };

    const response_chart = await axios.request(options_chart);

    return {
      data: response_data.data,
      chart: response_chart.data
    };
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Failed to fetch reading');
  }
};