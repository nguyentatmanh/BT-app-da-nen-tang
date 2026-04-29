import axios from 'axios';
import { WeatherResponse } from '../types/weather';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherResponse> => {
  const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  
  if (__DEV__) {
    console.log('fetchWeather Debug:', {
      hasApiKey: Boolean(apiKey),
    });
  }

  if (!apiKey) {
    throw new Error('OpenWeatherMap API key is missing. Please add it to your .env file.');
  }

  try {
    const response = await weatherClient.get<WeatherResponse>('/weather', {
      params: {
        lat,
        lon,
        appid: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(`Weather API Error: ${message}`);
    }
    throw new Error('An unexpected error occurred while fetching weather data.');
  }
};
