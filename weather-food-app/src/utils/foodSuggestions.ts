import { WeatherResponse, WeatherCategory } from '../types/weather';
import { Food } from '../types/food';

export const FOOD_LIST: Food[] = [
  // Sunny
  {
    id: '1',
    name: 'Gỏi cuốn tôm thịt',
    description: 'Gỏi cuốn tươi với tôm và thịt heo.',
    image: 'goi-cuon-tom-thit.jpg',
    weatherCategory: 'sunny',
  },
  {
    id: '2',
    name: 'Chè đá xanh',
    description: 'Chè đậu xanh ăn kèm đá mát lạnh.',
    image: 'che-da-xanh.jpg',
    weatherCategory: 'sunny',
  },
  {
    id: '3',
    name: 'Bún bò Huế',
    description: 'Bún bò Huế đậm vị, cay nhẹ đặc trưng.',
    image: 'bun-bo-hue.jpg',
    weatherCategory: 'sunny',
  },
  {
    id: '4',
    name: 'Sinh tố bơ',
    description: 'Sinh tố bơ béo mịn, thơm ngon.',
    image: 'sinh-to-bo.jpg',
    weatherCategory: 'sunny',
  },
  // Rainy
  {
    id: '5',
    name: 'Phở bò tái chín',
    description: 'Phở bò thơm nức lòng với thịt tái chín mềm mại.',
    image: 'pho-bo-tai-chin.png',
    weatherCategory: 'rainy',
  },
  {
    id: '6',
    name: 'Bánh mì nóng',
    description: 'Bánh mì giòn rụm, nóng hổi cho ngày mưa.',
    image: 'banh-mi-nong.jpg',
    weatherCategory: 'rainy',
  },
  {
    id: '7',
    name: 'Cháo gà',
    description: 'Cháo gà ấm nóng, giải cảm và dễ tiêu hóa.',
    image: 'chao-ga.jpg',
    weatherCategory: 'rainy',
  },
  {
    id: '8',
    name: 'Mì Quảng',
    description: 'Mì Quảng đậm đà với tôm, thịt và bánh tráng giòn.',
    image: 'mi-quang.jpg',
    weatherCategory: 'rainy',
  },
  // Cold
  {
    id: '9',
    name: 'Lẩu thái hải sản',
    description: 'Lẩu Thái chua cay, hải sản tươi ngon, sưởi ấm ngày lạnh.',
    image: 'lau-thai-hai-san.webp',
    weatherCategory: 'cold',
  },
  {
    id: '10',
    name: 'Súp bí đỏ',
    description: 'Súp bí đỏ sánh mịn, béo ngậy và ấm áp.',
    image: 'sup-bi-do.jpg',
    weatherCategory: 'cold',
  },
  {
    id: '11',
    name: 'Bánh bao nhân thịt',
    description: 'Bánh bao trắng ngần, nhân thịt trứng cút nóng hổi.',
    image: 'banh-bao-nhan-thit.webp',
    weatherCategory: 'cold',
  },
  {
    id: '12',
    name: 'Trà gừng mật ong',
    description: 'Trà gừng mật ong ấm nồng, tốt cho sức khỏe.',
    image: 'tra-gung-mat-ong.webp',
    weatherCategory: 'cold',
  },
  // Cloudy
  {
    id: '13',
    name: 'Cơm tấm sườn bì chả',
    description: 'Cơm tấm đặc sản với sườn nướng thơm lừng.',
    image: 'com-tam-suon-bi-cha.jpg',
    weatherCategory: 'cloudy',
  },
  {
    id: '14',
    name: 'Bún chả Hà Nội',
    description: 'Bún chả với nước mắm đậm đà, thịt nướng thơm phức.',
    image: 'bun-cha-ha-noi.jpeg',
    weatherCategory: 'cloudy',
  },
  {
    id: '15',
    name: 'Bánh xèo miền Trung',
    description: 'Bánh xèo giòn tan, ăn kèm rau sống và nước chấm.',
    image: 'banh-xeo-mien-trung.jpg',
    weatherCategory: 'cloudy',
  },
  {
    id: '16',
    name: 'Nước mía',
    description: 'Nước mía mát lạnh, ngọt thanh giải nhiệt.',
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
