import { useState, useCallback } from 'react';
import * as Location from 'expo-location';

interface LocationData {
  latitude: number;
  longitude: number;
}

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const formatAddress = (result: Location.LocationGeocodedAddress) => {
    const parts = [
      result.streetNumber,
      result.street,
      result.district,
      result.subregion,
      result.city,
      result.region,
      result.country,
    ].filter(Boolean);

    // Remove duplicates and join with comma
    return Array.from(new Set(parts)).join(', ');
  };

  const requestLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      // Check if location services are enabled
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        setLocationError('Dịch vụ định vị đã bị tắt. Vui lòng bật định vị trong cài đặt thiết bị.');
        setIsLoadingLocation(false);
        return;
      }

      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Quyền truy cập vị trí bị từ chối.');
        setIsLoadingLocation(false);
        return;
      }

      // Get current position
      const currentPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      };

      setLocation(coords);

      // Perform reverse geocoding
      try {
        const geocodeResults = await Location.reverseGeocodeAsync(coords);
        if (geocodeResults && geocodeResults.length > 0) {
          const formattedAddress = formatAddress(geocodeResults[0]);
          setAddress(formattedAddress);
        }
      } catch (geoError) {
        console.warn('Reverse geocoding failed:', geoError);
        // Fallback to null address but don't block
        setAddress(null);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationError('Không thể xác định vị trí của bạn.');
    } finally {
      setIsLoadingLocation(false);
    }
  }, []);

  return { 
    location, 
    address, 
    isLoadingLocation, 
    locationError, 
    requestLocation 
  };
};
