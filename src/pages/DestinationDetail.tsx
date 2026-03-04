import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Clock, 
  TrendingUp, 
  Calendar,
  ArrowLeft,
  Share2,
  Heart,
  Check,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Mountain,
  Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDestinationById, type Destination } from '@/data/destinations';
import { getUserLocation, getDistance, formatDistance } from '@/utils/haversine';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker icons
const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const dest = getDestinationById(id);
      if (dest) {
        setDestination(dest);
      } else {
        navigate('/destinations');
      }
    }
  }, [id, navigate]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        if (destination) {
          const dist = getDistance(
            location.latitude,
            location.longitude,
            destination.latitude,
            destination.longitude
          );
          setDistance(dist);
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };
    fetchLocation();
  }, [destination]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#ff7f50] border-t-transparent rounded-full" />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
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
      {/* Hero Gallery */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={destination.images[currentImageIndex]}
            alt={destination.name}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Navigation */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={prevImage}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {destination.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentImageIndex === index ? 'w-8 bg-[#ff7f50]' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Zoom Button */}
        <button
          onClick={() => openLightbox(currentImageIndex)}
          className="absolute top-24 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ZoomIn className="w-6 h-6 text-white" />
        </button>

        {/* Back Button */}
        <Link
          to="/destinations"
          className="absolute top-24 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Badge className={`${categoryColors[destination.category]} text-white mb-4`}>
                {destination.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {destination.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{destination.location}, {destination.province}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>{destination.rating} ({destination.reviewCount} reviews)</span>
                </div>
                {distance && (
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5" />
                    <span>{formatDistance(distance)} away</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="attractions">Attractions</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                  >
                    <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {destination.fullDescription}
                    </p>
                    
                    {destination.history && (
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="text-lg font-semibold mb-3">History</h3>
                        <p className="text-gray-600 dark:text-gray-400">{destination.history}</p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <Clock className="w-6 h-6 text-[#ff7f50] mb-2" />
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold">{destination.duration}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <TrendingUp className="w-6 h-6 text-[#ff7f50] mb-2" />
                        <p className="text-sm text-gray-500">Difficulty</p>
                        <p className="font-semibold">{destination.difficulty}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <Calendar className="w-6 h-6 text-[#ff7f50] mb-2" />
                        <p className="text-sm text-gray-500">Best Time</p>
                        <p className="font-semibold">{destination.bestTimeToVisit}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Highlights */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-bold mb-4">Highlights</h3>
                    <div className="flex flex-wrap gap-3">
                      {destination.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-[#ff7f50]/10 text-[#ff7f50] px-4 py-2 rounded-full"
                        >
                          <Check className="w-4 h-4" />
                          <span className="font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="attractions">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                  >
                    <h2 className="text-2xl font-bold mb-6">Must-See Attractions</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {destination.attractions.map((attraction, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                        >
                          <div className="w-12 h-12 bg-[#ff7f50] rounded-xl flex items-center justify-center flex-shrink-0">
                            <Mountain className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-medium">{attraction}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="activities">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                  >
                    <h2 className="text-2xl font-bold mb-6">Things to Do</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {destination.activities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-[#ff7f50] to-[#ff6b35] rounded-xl flex items-center justify-center flex-shrink-0">
                            <Compass className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-medium">{activity}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="map">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                  >
                    <h2 className="text-2xl font-bold mb-6">Location</h2>
                    <div className="h-[400px] rounded-xl overflow-hidden">
                      <MapContainer
                        center={[destination.latitude, destination.longitude]}
                        zoom={13}
                        scrollWheelZoom={false}
                        className="h-full w-full"
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                          position={[destination.latitude, destination.longitude]}
                          icon={destinationIcon}
                        >
                          <Popup>
                            <div className="text-center">
                              <p className="font-bold">{destination.name}</p>
                              <p className="text-sm text-gray-600">{destination.location}</p>
                            </div>
                          </Popup>
                        </Marker>
                        {userLocation && (
                          <Marker
                            position={[userLocation.latitude, userLocation.longitude]}
                            icon={userIcon}
                          >
                            <Popup>
                              <p className="font-bold">Your Location</p>
                            </Popup>
                          </Marker>
                        )}
                      </MapContainer>
                    </div>
                    <div className="mt-4 flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#ff7f50]" />
                        <span className="text-sm">{destination.name}</span>
                      </div>
                      {userLocation && (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-blue-500" />
                          <span className="text-sm">Your Location</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-3xl font-bold text-[#ff7f50]">
                        {destination.price === 0 ? 'Free' : `NPR ${destination.price.toLocaleString()}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="w-12 h-12 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                      <button className="w-12 h-12 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <Link to={`/booking/${destination.id}`}>
                    <Button 
                      className="w-full bg-[#ff7f50] hover:bg-[#e86a3a] text-white py-6 rounded-xl text-lg font-medium mb-4"
                    >
                      Book Now
                    </Button>
                  </Link>

                  <p className="text-center text-sm text-gray-500">
                    Free cancellation up to 24 hours before
                  </p>
                </motion.div>

                {/* Quick Info */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="font-bold mb-4">Quick Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Category</span>
                      <Badge variant="secondary">{destination.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium">{destination.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Difficulty</span>
                      <span className="font-medium">{destination.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{destination.rating}</span>
                      </div>
                    </div>
                    {distance && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Distance</span>
                        <span className="font-medium">{formatDistance(distance)}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setShowLightbox(false)}
          >
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length);
              }}
              className="absolute left-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % destination.images.length);
              }}
              className="absolute right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.img
              key={lightboxIndex}
              src={destination.images[lightboxIndex]}
              alt={destination.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
