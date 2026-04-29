import { WeatherResponse } from '../types/weather';

export const MOCK_WEATHER: Record<'sunny' | 'rainy' | 'cold' | 'cloudy', WeatherResponse> = {
  sunny: {
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    main: { temp: 30 },
    name: 'Ho Chi Minh City',
  },
  rainy: {
    weather: [{ main: 'Rain', description: 'moderate rain', icon: '10d' }],
    main: { temp: 24 },
    name: 'Da Lat',
  },
  cold: {
    weather: [{ main: 'Mist', description: 'misty', icon: '50d' }],
    main: { temp: 15 },
    name: 'Hanoi',
  },
  cloudy: {
    weather: [{ main: 'Clouds', description: 'broken clouds', icon: '04d' }],
    main: { temp: 26 },
    name: 'Da Nang',
  },
};

export const ACTIVE_MOCK = MOCK_WEATHER.cloudy;
