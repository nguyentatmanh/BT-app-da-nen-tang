import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/weatherApi';
import { ACTIVE_MOCK } from '../mock/mockWeatherData';
import { WeatherResponse } from '../types/weather';


export const useWeatherQuery = (lat?: number, lon?: number) => {
  return useQuery<WeatherResponse>({
    queryKey: ['weather', lat, lon],
    queryFn: async (): Promise<WeatherResponse> => {
      const isMockMode = process.env.EXPO_PUBLIC_USE_MOCK === 'true';

      if (__DEV__) {
        console.log('useWeatherQuery Debug:', {
          useMock: process.env.EXPO_PUBLIC_USE_MOCK,
          isMockMode,
        });
      }

      if (isMockMode) {
        // Simulate a small delay for realistic mock experience
        return new Promise((resolve) => {
          setTimeout(() => resolve(ACTIVE_MOCK), 500);
        });
      }
      
      if (lat === undefined || lon === undefined) {
        throw new Error('Coordinates are required for weather fetch');
      }
      
      return fetchWeather(lat, lon);
    },
    enabled: process.env.EXPO_PUBLIC_USE_MOCK === 'true' || (typeof lat === 'number' && typeof lon === 'number'),
  });
};
