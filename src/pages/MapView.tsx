import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { destinations } from '@/data/destinations';
import { SEO } from '@/components/SEO';
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

  // Leaflet caches its container size. Without this, resizing across a
  // breakpoint or rotating the phone leaves stale/blank tile gaps.
  useEffect(() => {
    const handleResize = () => map.invalidateSize();
    const timer = window.setTimeout(handleResize, 150);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [map]);

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
    <div className="min-h-screen pt-20 overflow-x-hidden bg-gray-50 dark:bg-gray-900">
      <SEO
        title="Map of Nepal Destinations | Himaly"
        description="See where every Himaly trip is on the map. Plot trekking routes, heritage sites, lakes and national parks across Nepal and find destinations near you."
        canonicalPath="/map"
        ogImage="/img/hero.jpeg"
      />
      {/* Header */}
      <section className="bg-gradient-to-b from-[#E8672A]/10 to-transparent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Explore <span className="text-[#E8672A]">Nepal Map</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Discover all trekking routes, heritage sites and national parks across Nepal. Find the nearest attractions to your location.
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
              className="lg:col-span-1 space-y-4 order-2 lg:order-1"
            >
              {/* Controls */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setMapType('standard')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      mapType === 'standard' 
                        ? 'bg-[#E8672A] text-white' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setMapType('satellite')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      mapType === 'satellite' 
                        ? 'bg-[#E8672A] text-white' 
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
                      showNearest ? 'bg-[#E8672A]' : 'bg-gray-300'
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
                    <Navigation className="w-5 h-5 text-[#E8672A]" />
                    <h3 className="font-bold">Nearest to You</h3>
                  </div>
                  
                  <div className="space-y-2 max-h-[320px] sm:max-h-[400px] overflow-y-auto">
                    {nearestDestinations.map((dest, index) => (
                      <motion.button
                        key={dest.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleDestinationClick(dest)}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl transition-all ${
                          selectedDestination === dest.id
                            ? 'bg-[#E8672A]/10 border-2 border-[#E8672A]'
                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <img
                            src={dest.images[0]}
                            alt={`${dest.name} in ${dest.province}, Nepal`}
                            loading="lazy"
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{dest.name}</p>
                            <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{dest.location}</span>
                            </p>
                            {dest.distance && (
                              <p className="text-xs sm:text-sm text-[#E8672A] font-medium">
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
                <div className="space-y-2 max-h-[50vh] lg:max-h-[300px] overflow-y-auto">
                  {destinationsWithDistance.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => handleDestinationClick(dest)}
                      className={`w-full text-left px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                        selectedDestination === dest.id
                          ? 'bg-[#E8672A] text-white'
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
              className="lg:col-span-3 order-1 lg:order-2"
            >
              {/* Wrapper with relative positioning for overlay */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-[340px] sm:h-[420px] lg:h-[560px]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
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
                                alt={`${dest.name} in ${dest.province}, Nepal`}
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
                                <span className="font-bold text-[#E8672A]">
                                  {dest.price === 0 ? 'Free' : `NPR ${dest.price.toLocaleString()}`}
                                </span>
                                <Link to={`/destination/${dest.id}`}>
                                  <Button size="sm" className="bg-[#E8672A] text-white">
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

                {/* Map Overlay Legend - outside overflow-hidden, kept below the Navbar's z-50 */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-lg z-10 max-w-[calc(100%-1.5rem)]">
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-[10px] sm:text-xs">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#E8672A] shrink-0" />
                      <span>Destinations</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500 shrink-0" />
                      <span>Nearest</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-blue-500 shrink-0" />
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
