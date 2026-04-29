import { ImageSourcePropType } from 'react-native';

// Static mapping for all 16 food items
export const foodImageMap: Record<string, ImageSourcePropType> = {
  'goi-cuon-tom-thit.jpg': require('../../assets/foods/goi-cuon-tom-thit.jpg'),
  'che-da-xanh.jpg': require('../../assets/foods/che-da-xanh.jpg'),
  'bun-bo-hue.jpg': require('../../assets/foods/bun-bo-hue.jpg'),
  'sinh-to-bo.jpg': require('../../assets/foods/sinh-to-bo.jpg'),
  'pho-bo-tai-chin.png': require('../../assets/foods/pho-bo-tai-chin.png'),
  'banh-mi-nong.jpg': require('../../assets/foods/banh-mi-nong.jpg'),
  'chao-ga.jpg': require('../../assets/foods/chao-ga.jpg'),
  'mi-quang.jpg': require('../../assets/foods/mi-quang.jpg'),
  'lau-thai-hai-san.webp': require('../../assets/foods/lau-thai-hai-san.webp'),
  'sup-bi-do.jpg': require('../../assets/foods/sup-bi-do.jpg'),
  'banh-bao-nhan-thit.webp': require('../../assets/foods/banh-bao-nhan-thit.webp'),
  'tra-gung-mat-ong.webp': require('../../assets/foods/tra-gung-mat-ong.webp'),
  'com-tam-suon-bi-cha.jpg': require('../../assets/foods/com-tam-suon-bi-cha.jpg'),
  'bun-cha-ha-noi.jpeg': require('../../assets/foods/bun-cha-ha-noi.jpeg'),
  'banh-xeo-mien-trung.jpg': require('../../assets/foods/banh-xeo-mien-trung.jpg'),
  'nuoc-mia.jpg': require('../../assets/foods/nuoc-mia.jpg'),
};

export const getFoodImage = (imageName: string): ImageSourcePropType | null => {
  return foodImageMap[imageName] || null;
};
