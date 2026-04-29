import { WeatherCategory } from './weather';

export interface Food {
  id: string;
  name: string;
  description: string;
  image: string;
  weatherCategory: WeatherCategory;
}
