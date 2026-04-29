import { create } from 'zustand';
import { WeatherResponse } from '../types/weather';
import { Food } from '../types/food';

interface WeatherState {
  weather: WeatherResponse | null;
  selectedFood: Food | null;
  setWeather: (weather: WeatherResponse) => void;
  setSelectedFood: (food: Food | null) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  selectedFood: null,
  setWeather: (weather) => set({ weather }),
  setSelectedFood: (food) => set({ selectedFood: food }),
}));
