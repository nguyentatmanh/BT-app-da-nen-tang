import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/weatherApi';
import { ACTIVE_MOCK } from '../mock/mockWeatherData';

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true';

export const useWeatherQuery = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: async () => {
      if (USE_MOCK) {
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
    enabled: USE_MOCK || (typeof lat === 'number' && typeof lon === 'number'),
  });
};
