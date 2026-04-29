import { WeatherResponse, WeatherCategory } from '../types/weather';
import { Food } from '../types/food';

export const FOOD_LIST: Food[] = [
  // Sunny
  {
    id: '1',
    name: 'Gỏi cuốn tôm thịt',
    description: 'Fresh spring rolls with shrimp and pork.',
    image: 'goi-cuon-tom-thit.jpg',
    weatherCategory: 'sunny',
  },
  {
    id: '2',
    name: 'Chè đá xanh',
    description: 'Sweet green bean soup with ice.',
    image: 'che-da-xanh.jpg',
    weatherCategory: 'sunny',
  },
  {
    id: '3',
    name: 'Bún bò Huế',
    description: 'Hue style spicy beef noodle soup.',
    image: 'bun-bo-hue.jpg',
    weatherCategory: 'sunny',
  },
  {
    id: '4',
    name: 'Sinh tố bơ',
    description: 'Creamy avocado smoothie.',
    image: 'sinh-to-bo.jpg',
    weatherCategory: 'sunny',
  },
  // Rainy
  {
    id: '5',
    name: 'Phở bò tái chín',
    description: 'Beef noodle soup with rare and well-done beef.',
    image: 'pho-bo-tai-chin.jpg',
    weatherCategory: 'rainy',
  },
  {
    id: '6',
    name: 'Bánh mì nóng',
    description: 'Hot and crispy Vietnamese baguette.',
    image: 'banh-mi-nong.jpg',
    weatherCategory: 'rainy',
  },
  {
    id: '7',
    name: 'Cháo gà',
    description: 'Hot chicken congee.',
    image: 'chao-ga.jpg',
    weatherCategory: 'rainy',
  },
  {
    id: '8',
    name: 'Mì Quảng',
    description: 'Quang style noodles with shrimp and pork.',
    image: 'mi-quang.jpg',
    weatherCategory: 'rainy',
  },
  // Cold
  {
    id: '9',
    name: 'Lẩu thái hải sản',
    description: 'Spicy and sour Thai seafood hotpot.',
    image: 'lau-thai-hai-san.jpg',
    weatherCategory: 'cold',
  },
  {
    id: '10',
    name: 'Súp bí đỏ',
    description: 'Creamy pumpkin soup.',
    image: 'sup-bi-do.jpg',
    weatherCategory: 'cold',
  },
  {
    id: '11',
    name: 'Bánh bao nhân thịt',
    description: 'Steamed bun with meat filling.',
    image: 'banh-bao-nhan-thit.jpg',
    weatherCategory: 'cold',
  },
  {
    id: '12',
    name: 'Trà gừng mật ong',
    description: 'Warm ginger tea with honey.',
    image: 'tra-gung-mat-ong.jpg',
    weatherCategory: 'cold',
  },
  // Cloudy
  {
    id: '13',
    name: 'Cơm tấm sườn bì chả',
    description: 'Broken rice with grilled pork, skin and egg loaf.',
    image: 'com-tam-suon-bi-cha.jpg',
    weatherCategory: 'cloudy',
  },
  {
    id: '14',
    name: 'Bún chả Hà Nội',
    description: 'Hanoi style grilled pork with noodles.',
    image: 'bun-cha-ha-noi.jpg',
    weatherCategory: 'cloudy',
  },
  {
    id: '15',
    name: 'Bánh xèo miền Trung',
    description: 'Central style crispy pancake.',
    image: 'banh-xeo-mien-trung.jpg',
    weatherCategory: 'cloudy',
  },
  {
    id: '16',
    name: 'Nước mía',
    description: 'Refreshing sugarcane juice.',
    image: 'nuoc-mia.jpg',
    weatherCategory: 'cloudy',
  },
];

export const getWeatherCategory = (weather: WeatherResponse): WeatherCategory => {
  const temp = weather.main.temp;
  const main = weather.weather[0]?.main;

  if (temp < 18 || main === 'Mist' || main === 'Fog') {
    return 'cold';
  }
  if (main === 'Rain' || main === 'Drizzle') {
    return 'rainy';
  }
  if (temp > 28 || main === 'Clear') {
    return 'sunny';
  }
  return 'cloudy';
};

export const getFoodSuggestions = (weather: WeatherResponse): Food[] => {
  const category = getWeatherCategory(weather);
  return FOOD_LIST.filter((food) => food.weatherCategory === category);
};
