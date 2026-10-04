export interface Coordinates {
  latitude: number;
  longitude: number;
}

export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

export function getDistanceInKm(coords1: Coordinates, coords2: Coordinates): number {
  return getDistance(coords1.latitude, coords1.longitude, coords2.latitude, coords2.longitude);
}

export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  if (distance < 10) {
    return `${distance.toFixed(1)} km`;
  }
  return `${Math.round(distance)} km`;
}

export function sortByDistance<T extends { latitude: number; longitude: number }>(
  items: T[],
  userLocation: Coordinates
): (T & { distance: number })[] {
  return items
    .map(item => ({
      ...item,
      distance: getDistanceInKm(userLocation, { latitude: item.latitude, longitude: item.longitude })
    }))
    .sort((a, b) => a.distance - b.distance);
}

export function getUserLocation(): Promise<Coordinates> {
  return new Promise((resolve, _reject) => {
    if (!navigator.geolocation) {
      // Default to Kathmandu if geolocation not available
      resolve({ latitude: 27.7172, longitude: 85.3240 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        // Default to Kathmandu on error
        resolve({ latitude: 27.7172, longitude: 85.3240 });
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  });
}

export function useDefaultLocation(): Coordinates {
  return { latitude: 27.7172, longitude: 85.3240 };
}
