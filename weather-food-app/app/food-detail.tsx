import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useWeatherStore } from '../src/store/useWeatherStore';
import { getFoodImage } from '../src/utils/imageAssets';

const { width } = Dimensions.get('window');

export default function FoodDetailScreen() {
  const router = useRouter();
  const { selectedFood } = useWeatherStore();

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'sunny': return 'NẮNG';
      case 'rainy': return 'MƯA';
      case 'cold': return 'LẠNH';
      case 'cloudy': return 'NHIỀU MÂY';
      default: return category.toUpperCase();
    }
  };

  if (!selectedFood) {
    return (
      <View style={styles.center}>
        <MaterialCommunityIcons name="food-off-outline" size={80} color="#CCC" />
        <Text style={styles.emptyTitle}>Chưa chọn món ăn</Text>
        <Text style={styles.emptySubtitle}>Quay lại trang chủ để tìm gợi ý món ăn phù hợp với thời tiết nhé!</Text>
        <TouchableOpacity 
          style={styles.backHomeButton} 
          onPress={() => router.replace('/')}
        >
          <Text style={styles.backHomeText}>Về trang chủ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const imageSource = getFoodImage(selectedFood.image);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView bounces={false} contentContainerStyle={styles.container}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          {imageSource ? (
            <Image source={imageSource} style={styles.mainImage} resizeMode="cover" />
          ) : (
            <View style={styles.placeholderContainer}>
              <MaterialCommunityIcons name="food-variant" size={100} color="#DDD" />
              <Text style={styles.placeholderText}>Hình ảnh sẽ được cập nhật</Text>
            </View>
          )}
          
          {/* Custom Back Button Overlay */}
          <TouchableOpacity 
            style={styles.overlayBackButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{selectedFood.name}</Text>
            <View style={[styles.badge, styles[selectedFood.weatherCategory]]}>
              <Text style={styles.badgeText}>{getCategoryLabel(selectedFood.weatherCategory)}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="#FF6B6B" />
              <Text style={styles.infoValue}>Nhóm: {getCategoryLabel(selectedFood.weatherCategory)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="image-outline" size={20} color="#FF6B6B" />
              <Text style={styles.infoValue} numberOfLines={1}>{selectedFood.image}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Giới thiệu món ăn</Text>
          <Text style={styles.description}>{selectedFood.description}</Text>
          
          <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Tại sao món này lại phù hợp?</Text>
          <Text style={styles.description}>
            Dựa trên điều kiện thời tiết hiện tại, món ăn này mang lại sự cân bằng 
            hoàn hảo về hương vị và cảm giác để giúp bạn tận hưởng ngày mới tốt nhất.
          </Text>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => router.back()}
            >
              <Text style={styles.actionButtonText}>Gợi ý thêm món khác</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F8F9FA',
  },
  imageContainer: {
    width: width,
    height: width * 0.8,
    position: 'relative',
    backgroundColor: '#F0F0F0',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#AAA',
    fontSize: 16,
    fontWeight: '500',
  },
  overlayBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 25,
    paddingBottom: 40,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    flex: 1,
    marginRight: 15,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  backHomeButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
  },
  backHomeText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  footer: {
    marginTop: 40,
  },
  actionButton: {
    backgroundColor: '#333',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  sunny: { backgroundColor: '#FF9F43' },
  rainy: { backgroundColor: '#54A0FF' },
  cold: { backgroundColor: '#00D2D3' },
  cloudy: { backgroundColor: '#8395A7' },
});
