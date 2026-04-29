import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useWeatherStore } from '../src/store/useWeatherStore';
import { useWeatherQuery } from '../src/hooks/useWeatherQuery';
import { useCurrentLocation } from '../src/hooks/useCurrentLocation';
import { getFoodSuggestions } from '../src/utils/foodSuggestions';
import { Food } from '../src/types/food';

const IS_MOCK_MODE = process.env.EXPO_PUBLIC_USE_MOCK === 'true';

export default function HomeScreen() {
  const router = useRouter();
  const { setSelectedFood, setWeather } = useWeatherStore();
  const { location, isLoadingLocation, locationError, requestLocation } = useCurrentLocation();
  
  const { 
    data: weatherData, 
    isLoading: isLoadingWeather, 
    isError: isWeatherError, 
    error: weatherError 
  } = useWeatherQuery(location?.latitude, location?.longitude);

  useEffect(() => {
    // Only request location if not in mock mode
    if (!IS_MOCK_MODE) {
      requestLocation();
    }
  }, [requestLocation]);

  useEffect(() => {
    if (weatherData) {
      setWeather(weatherData);
    }
  }, [weatherData, setWeather]);

  const handleFoodPress = (food: Food) => {
    setSelectedFood(food);
    router.push('/food-detail');
  };

  // Loading state handling
  // In mock mode, we don't wait for location, just for weather (which is instant/simulated)
  const isActuallyLoading = IS_MOCK_MODE 
    ? isLoadingWeather && !weatherData 
    : isLoadingLocation || (isLoadingWeather && !weatherData);

  if (isActuallyLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.mt10}>
          {IS_MOCK_MODE ? 'Loading mock weather...' : 'Fetching location and weather...'}
        </Text>
      </View>
    );
  }

  // Error handling: Only show location errors in real API mode
  if (!IS_MOCK_MODE && locationError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{locationError}</Text>
        <TouchableOpacity style={styles.button} onPress={requestLocation}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isWeatherError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {weatherError instanceof Error ? weatherError.message : 'Failed to fetch weather'}
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={IS_MOCK_MODE ? () => {} : requestLocation}
        >
          <Text style={styles.buttonText}>{IS_MOCK_MODE ? 'Retry' : 'Try Again'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!weatherData) return null;

  const suggestedFoods = getFoodSuggestions(weatherData);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.city}>{weatherData.name}</Text>
        <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°C</Text>
        <Text style={styles.description}>{weatherData.weather[0]?.description}</Text>
        {IS_MOCK_MODE && (
          <View style={styles.mockBadge}>
            <Text style={styles.mockBadgeText}>MOCK MODE</Text>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Suggested Foods for You</Text>
      
      <FlatList
        data={suggestedFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.foodItem} 
            onPress={() => handleFoodPress(item)}
          >
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodDesc} numberOfLines={1}>{item.description}</Text>
            </View>
            <Text style={styles.imagePlaceholder}>{item.image}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    color: '#666',
    textTransform: 'capitalize',
  },
  mockBadge: {
    marginTop: 10,
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mockBadgeText: {
    fontSize: 10,
    color: '#0288d1',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  foodItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  foodDesc: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  imagePlaceholder: {
    fontSize: 10,
    color: '#999',
    marginLeft: 10,
    width: 80,
    textAlign: 'right',
  },
  mt10: {
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
