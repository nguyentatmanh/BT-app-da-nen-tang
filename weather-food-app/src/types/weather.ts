export type WeatherCategory = 'sunny' | 'rainy' | 'cold' | 'cloudy';

export interface WeatherResponse {
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like?: number;
    humidity?: number;
  };
  name: string;
}
