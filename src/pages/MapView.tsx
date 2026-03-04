import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { destinations } from '@/data/destinations';
import { getUserLocation, getDistance, formatDistance } from '@/utils/haversine';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Custom marker icons
const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const nearestIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [30, 46],
  iconAnchor: [15, 46],
  popupAnchor: [1, -34],
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Map controller component
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export function MapView() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.3949, 84.1240]);
  const [mapZoom, setMapZoom] = useState(7);
  const [showNearest, setShowNearest] = useState(true);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        setMapCenter([location.latitude, location.longitude]);
        setMapZoom(8);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };
    fetchLocation();
  }, []);

  // Calculate distances and sort destinations
  const destinationsWithDistance = useMemo(() => {
    if (!userLocation) return destinations.map(d => ({ ...d, distance: null }));
    
    return destinations
      .map(dest => ({
        ...dest,
        distance: getDistance(
          userLocation.latitude,
          userLocation.longitude,
          dest.latitude,
          dest.longitude
        )
      }))
      .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
  }, [userLocation]);

  const nearestDestinations = useMemo(() => {
    return destinationsWithDistance.filter(d => d.distance !== null).slice(0, 5);
  }, [destinationsWithDistance]);

  const handleDestinationClick = (dest: typeof destinations[0]) => {
    setMapCenter([dest.latitude, dest.longitude]);
    setMapZoom(12);
    setSelectedDestination(dest.id);
  };

  const categoryColors: Record<string, string> = {
    Adventure: 'bg-orange-500',
    Cultural: 'bg-purple-500',
    Nature: 'bg-green-500',
    Pilgrimage: 'bg-amber-500',
    Wildlife: 'bg-emerald-500'
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#ff7f50]/10 to-transparent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="text-[#ff7f50]">Nepal Map</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Discover all destinations across Nepal. Find the nearest attractions to your location.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-4"
            >
              {/* Controls */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setMapType('standard')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      mapType === 'standard' 
                        ? 'bg-[#ff7f50] text-white' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setMapType('satellite')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      mapType === 'satellite' 
                        ? 'bg-[#ff7f50] text-white' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    Satellite
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Show Nearest</span>
                  <button
                    onClick={() => setShowNearest(!showNearest)}
                    aria-label="Toggle nearest destinations"
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      showNearest ? 'bg-[#ff7f50]' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      showNearest ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Nearest Destinations */}
              {userLocation && showNearest && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Navigation className="w-5 h-5 text-[#ff7f50]" />
                    <h3 className="font-bold">Nearest to You</h3>
                  </div>
                  
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {nearestDestinations.map((dest, index) => (
                      <motion.button
                        key={dest.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleDestinationClick(dest)}
                        className={`w-full text-left p-3 rounded-xl transition-all ${
                          selectedDestination === dest.id
                            ? 'bg-[#ff7f50]/10 border-2 border-[#ff7f50]'
                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={dest.images[0]}
                            alt={dest.name}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{dest.name}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {dest.location}
                            </p>
                            {dest.distance && (
                              <p className="text-sm text-[#ff7f50] font-medium">
                                {formatDistance(dest.distance)}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* All Destinations List */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                <h3 className="font-bold mb-4">All Destinations</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {destinationsWithDistance.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => handleDestinationClick(dest)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedDestination === dest.id
                          ? 'bg-[#ff7f50] text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{dest.name}</span>
                        {dest.distance && (
                          <span className="text-xs opacity-70">
                            {formatDistance(dest.distance)}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-3"
            >
              {/* Wrapper with relative positioning for overlay */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-[600px] lg:h-[700px]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    className="h-full w-full"
                  >
                    <MapController center={mapCenter} zoom={mapZoom} />
                    
                    {mapType === 'standard' ? (
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    ) : (
                      <TileLayer
                        attribution='&copy; Esri'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      />
                    )}

                    {/* User Location Marker */}
                    {userLocation && (
                      <Marker
                        position={[userLocation.latitude, userLocation.longitude]}
                        icon={userIcon}
                      >
                        <Popup>
                          <div className="text-center">
                            <p className="font-bold">Your Location</p>
                          </div>
                        </Popup>
                      </Marker>
                    )}

                    {/* Destination Markers */}
                    {destinations.map((dest) => {
                      const isNearest = nearestDestinations.some(n => n.id === dest.id);
                      
                      return (
                        <Marker
                          key={dest.id}
                          position={[dest.latitude, dest.longitude]}
                          icon={isNearest && showNearest ? nearestIcon : destinationIcon}
                          eventHandlers={{
                            click: () => setSelectedDestination(dest.id),
                          }}
                        >
                          <Popup>
                            <div className="min-w-[200px]">
                              <img
                                src={dest.images[0]}
                                alt={dest.name}
                                className="w-full h-32 object-cover rounded-lg mb-3"
                              />
                              <Badge className={`${categoryColors[dest.category]} text-white mb-2`}>
                                {dest.category}
                              </Badge>
                              <h3 className="font-bold text-lg mb-1">{dest.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{dest.location}</p>
                              <div className="flex items-center gap-2 mb-3">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="text-sm">{dest.rating}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-[#ff7f50]">
                                  {dest.price === 0 ? 'Free' : `NPR ${dest.price.toLocaleString()}`}
                                </span>
                                <Link to={`/destination/${dest.id}`}>
                                  <Button size="sm" className="bg-[#ff7f50] text-white">
                                    View
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      );
                    })}
                  </MapContainer>
                </div>

                {/* Map Overlay Legend - outside overflow-hidden */}
                <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg z-[400] max-w-xs">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#ff7f50]" />
                      <span>Destinations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                      <span>Nearest</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500" />
                      <span>You</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
