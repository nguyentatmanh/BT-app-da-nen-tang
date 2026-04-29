import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '../src/store/useWeatherStore';
import { useWeatherQuery } from '../src/hooks/useWeatherQuery';
import { useCurrentLocation } from '../src/hooks/useCurrentLocation';
import { getFoodSuggestions } from '../src/utils/foodSuggestions';
import { Food } from '../src/types/food';
import { getFoodImage } from '../src/utils/imageAssets';

const IS_MOCK_MODE = process.env.EXPO_PUBLIC_USE_MOCK === 'true';

export default function HomeScreen() {
  const router = useRouter();
  const { setSelectedFood, setWeather } = useWeatherStore();
  const { location, address, isLoadingLocation, locationError, requestLocation } = useCurrentLocation();
  
  const { 
    data: weatherData, 
    isLoading: isLoadingWeather, 
    isError: isWeatherError, 
    error: weatherError 
  } = useWeatherQuery(location?.latitude, location?.longitude);

  useEffect(() => {
    if (!IS_MOCK_MODE) {
      requestLocation();
    }
  }, [requestLocation]);

  useEffect(() => {
    if (weatherData) {
      setWeather(weatherData);
    }
  }, [weatherData, setWeather]);

  const getTranslatedDescription = (description: string) => {
    const map: Record<string, string> = {
      'clear sky': 'Trời quang',
      'few clouds': 'Ít mây',
      'scattered clouds': 'Mây rải rác',
      'broken clouds': 'Mây nhiều',
      'overcast clouds': 'Trời âm u',
      'light rain': 'Mưa nhẹ',
      'moderate rain': 'Mưa vừa',
      'heavy intensity rain': 'Mưa lớn',
      'mist': 'Sương mù nhẹ',
      'fog': 'Sương mù',
    };
    return map[description.toLowerCase()] || description.charAt(0).toUpperCase() + description.slice(1);
  };

  const handleFoodPress = (food: Food) => {
    setSelectedFood(food);
    router.push('/food-detail');
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear': return 'weather-sunny';
      case 'clouds': return 'weather-cloudy';
      case 'rain': return 'weather-rainy';
      case 'drizzle': return 'weather-partly-rainy';
      case 'mist':
      case 'fog': return 'weather-fog';
      default: return 'weather-cloudy';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'sunny': return 'NẮNG';
      case 'rainy': return 'MƯA';
      case 'cold': return 'LẠNH';
      case 'cloudy': return 'NHIỀU MÂY';
      default: return category.toUpperCase();
    }
  };

  const isActuallyLoading = IS_MOCK_MODE 
    ? isLoadingWeather && !weatherData 
    : isLoadingLocation || (isLoadingWeather && !weatherData);

  if (isActuallyLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.mt10}>
          {IS_MOCK_MODE ? 'Đang tải dữ liệu giả lập...' : 'Đang xác định vị trí của bạn...'}
        </Text>
      </View>
    );
  }

  if (!IS_MOCK_MODE && locationError) {
    return (
      <View style={styles.center}>
        <Ionicons name="location-outline" size={64} color="#FF6B6B" />
        <Text style={styles.errorText}>{locationError}</Text>
        <TouchableOpacity style={styles.button} onPress={requestLocation}>
          <Text style={styles.buttonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isWeatherError) {
    return (
      <View style={styles.center}>
        <MaterialCommunityIcons name="weather-cloudy-alert" size={64} color="#FF6B6B" />
        <Text style={styles.errorText}>
          {weatherError instanceof Error ? weatherError.message : 'Không thể tải dữ liệu thời tiết'}
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={IS_MOCK_MODE ? () => {} : requestLocation}
        >
          <Text style={styles.buttonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!weatherData) return null;

  const suggestedFoods = getFoodSuggestions(weatherData);

  // In real mode, use the geocoded address if available, otherwise fallback to weather data name
  const displayLocation = !IS_MOCK_MODE && address ? address : weatherData.name;
  const showWeatherArea = !IS_MOCK_MODE && address && weatherData.name && address !== weatherData.name;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Weather Header */}
      <View style={styles.weatherCard}>
        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={18} color="#FF6B6B" />
            <Text style={styles.locationTitle}>Vị trí hiện tại</Text>
            {IS_MOCK_MODE && <View style={styles.mockBadge}><Text style={styles.mockBadgeText}>GIẢ LẬP</Text></View>}
          </View>
          <Text style={styles.cityName} numberOfLines={2}>{displayLocation}</Text>
          {showWeatherArea && (
            <Text style={styles.weatherAreaText}>Khu vực thời tiết: {weatherData.name}</Text>
          )}
        </View>

        <View style={styles.weatherMain}>
          <View>
            <Text style={styles.tempText}>{Math.round(weatherData.main.temp)}°C</Text>
            <Text style={styles.conditionText}>
              {getTranslatedDescription(weatherData.weather[0]?.description || '')}
            </Text>
          </View>
          <MaterialCommunityIcons 
            name={getWeatherIcon(weatherData.weather[0]?.main || '') as any} 
            size={80} 
            color="#FF6B6B" 
          />
        </View>

        <View style={styles.weatherDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="thermometer-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Cảm giác như: {Math.round(weatherData.main.feels_like || weatherData.main.temp)}°C</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Độ ẩm: {weatherData.main.humidity || 0}%</Text>
          </View>
        </View>
      </View>

      <View style={styles.suggestionHeader}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#333" />
        <Text style={styles.suggestionTitle}>Gợi ý hôm nay</Text>
      </View>

      <FlatList
        data={suggestedFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const imageSource = getFoodImage(item.image);
          return (
            <TouchableOpacity 
              style={styles.foodCard} 
              onPress={() => handleFoodPress(item)}
              activeOpacity={0.7}
            >
              {imageSource ? (
                <Image source={imageSource} style={styles.foodImage} />
              ) : (
                <View style={[styles.foodImage, styles.placeholderImage]}>
                  <MaterialCommunityIcons name="food-off" size={32} color="#ccc" />
                </View>
              )}
              
              <View style={styles.foodInfo}>
                <View style={styles.foodHeader}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <View style={[styles.categoryTag, styles[item.weatherCategory]]}>
                    <Text style={styles.categoryText}>{getCategoryLabel(item.weatherCategory)}</Text>
                  </View>
                </View>
                <Text style={styles.foodDesc} numberOfLines={2}>{item.description}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  weatherCard: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  locationContainer: {
    marginBottom: 15,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B6B',
    textTransform: 'uppercase',
    marginLeft: 6,
    marginRight: 10,
    letterSpacing: 0.5,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginLeft: 0,
    lineHeight: 24,
  },
  weatherAreaText: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
    fontStyle: 'italic',
  },
  mockBadge: {
    backgroundColor: '#E1F5FE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mockBadgeText: {
    fontSize: 9,
    color: '#0288D1',
    fontWeight: 'bold',
  },
  weatherMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tempText: {
    fontSize: 56,
    fontWeight: '700',
    color: '#333',
  },
  conditionText: {
    fontSize: 18,
    color: '#666',
    textTransform: 'capitalize',
    marginTop: -5,
  },
  weatherDetails: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  suggestionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginLeft: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  foodCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  placeholderImage: {
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodInfo: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  foodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
    textTransform: 'uppercase',
  },
  foodDesc: {
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
  },
  sunny: { backgroundColor: '#FF9F43' },
  rainy: { backgroundColor: '#54A0FF' },
  cold: { backgroundColor: '#00D2D3' },
  cloudy: { backgroundColor: '#8395A7' },
  mt10: { marginTop: 10 },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
  },
});
