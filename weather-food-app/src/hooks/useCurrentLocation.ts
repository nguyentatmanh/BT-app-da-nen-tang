import { useState, useCallback } from 'react';
import * as Location from 'expo-location';

interface LocationData {
  latitude: number;
  longitude: number;
}

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      // Check if location services are enabled
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        setLocationError('Location services are disabled. Please enable location in device settings.');
        setIsLoadingLocation(false);
        return;
      }

      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permission to access location was denied. Please enable location permission in Settings.');
        setIsLoadingLocation(false);
        return;
      }

      // Get current position
      const currentPosition = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
    } catch (error) {
      setLocationError('Current location is unavailable. Make sure that location services are enabled.');
      // Avoid console.error for expected failures as per requirements
    } finally {
      setIsLoadingLocation(false);
    }
  }, []);

  return {
    location,
    isLoadingLocation,
    locationError,
    requestLocation,
  };
};
