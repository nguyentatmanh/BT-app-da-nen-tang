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
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setLocationError('Permission to access location was denied. Please enable location permission in Settings.');
        setIsLoadingLocation(false);
        return;
      }

      const currentPosition = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
    } catch (error) {
      setLocationError('An error occurred while fetching location.');
      console.error(error);
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
