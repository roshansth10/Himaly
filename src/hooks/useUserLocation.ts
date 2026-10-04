import { useState, useEffect, useCallback } from 'react';
import { type Coordinates, getUserLocation, useDefaultLocation } from '@/utils/haversine';

export function useUserLocation() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getUserLocation();
      setLocation(coords);
    } catch (err) {
      setError('Could not get your location');
      setLocation(useDefaultLocation());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshLocation();
  }, [refreshLocation]);

  return { location, loading, error, refreshLocation };
}
