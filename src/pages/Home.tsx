import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Mountain, 
  Landmark, 
  Trees, 
  Bird,
  Compass,
  Star,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { DestinationCard } from '@/components/DestinationCard';
import { destinations, getTopRatedDestinations, categories } from '@/data/destinations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getUserLocation, getDistance } from '@/utils/haversine';

export function Home() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [nearestDestinations, setNearestDestinations] = useState<typeof destinations>([]);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920',
    'https://images.unsplash.com/photo-1513023840371-dd774fcaee9b?w=1920',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        
        // Sort destinations by distance
        const sorted = [...destinations]
          .map(dest => ({
            ...dest,
            distance: getDistance(location.latitude, location.longitude, dest.latitude, dest.longitude)
          }))
          .sort((a, b) => (a.distance || 0) - (b.distance || 0))
          .slice(0, 4);
        
        setNearestDestinations(sorted);
      } catch (error) {
        console.error('Error getting location:', error);
        setNearestDestinations(getTopRatedDestinations(4));
      }
    };

    fetchLocation();
  }, []);

  const topDestinations = getTopRatedDestinations(8);
  const { ref: sectionRef } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images with Crossfade */}
        {heroImages.map((img, index) => (
          <motion.div
            key={img}
            initial={{ opacity: 0 }}
            animate={{ opacity: heroImageIndex === index ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </motion.div>
        ))}

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: '100%',
                opacity: 0 
              }}
              animate={{ 
                y: '-10%',
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Compass className="w-4 h-4 text-[#ff7f50]" />
              <span className="text-white/90 text-sm">Himaly – Discover the Soul of Nepal</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          >
            <span className="block">Discover</span>
            <span className="block text-[#ff7f50]">Nepal's</span>
            <span className="block">Majestic Beauty</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            From the towering Himalayas to ancient temples, embark on a journey of a lifetime.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <SearchBar variant="hero" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/destinations">
              <Button 
                size="lg"
                className="bg-[#ff7f50] hover:bg-[#e86a3a] text-white px-8 py-6 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:shadow-[#ff7f50]/30 hover:-translate-y-1"
              >
                Explore Destinations
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg font-medium backdrop-blur-sm"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Video
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '50+', label: 'Destinations' },
              { value: '10K+', label: 'Happy Travelers' },
              { value: '25+', label: 'Years Experience' },
              { value: '4.9', label: 'Average Rating' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore by <span className="text-[#ff7f50]">Category</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Find your perfect adventure from our diverse range of travel experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.filter(c => c.id !== 'all').map((category, index) => {
              const Icon = {
                Mountain,
                Landmark,
                Trees,
                Sparkles,
                Bird
              }[category.icon] || Compass;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/destinations?category=${category.id}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#ff7f50]/20 to-[#ff7f50]/5 rounded-2xl flex items-center justify-center group-hover:from-[#ff7f50] group-hover:to-[#ff6b35] transition-all duration-300">
                        <Icon className="w-8 h-8 text-[#ff7f50] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#ff7f50] transition-colors">
                        {category.name}
                      </h3>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Destinations Section */}
      <section ref={sectionRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Popular <span className="text-[#ff7f50]">Destinations</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl">
                Explore Nepal's most beloved travel experiences, handpicked for unforgettable adventures
              </p>
            </div>
            <Link to="/destinations">
              <Button 
                variant="outline" 
                className="mt-4 md:mt-0 border-[#ff7f50] text-[#ff7f50] hover:bg-[#ff7f50] hover:text-white rounded-full px-6"
              >
                View All Destinations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDestinations.map((destination, index) => (
              <DestinationCard 
                key={destination.id} 
                destination={destination} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Nearest Destinations Section */}
      {nearestDestinations.length > 0 && userLocation && (
        <section className="py-20 bg-gradient-to-b from-[#ff7f50]/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#ff7f50] rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Near You
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Destinations closest to your location
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearestDestinations.map((destination, index) => (
                <DestinationCard 
                  key={destination.id} 
                  destination={destination} 
                  distance={(destination as typeof destination & { distance?: number }).distance}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800"
                  alt="Nepal Temple"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#ff7f50] rounded-2xl flex flex-col items-center justify-center text-white shadow-xl"
              >
                <span className="text-4xl font-bold">25+</span>
                <span className="text-sm">Years</span>
              </motion.div>

              {/* Orbital Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -left-4 w-24 h-24 border-2 border-dashed border-[#ff7f50]/30 rounded-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="text-[#ff7f50]">Nepal Travel</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                With over 25 years of experience, we craft unforgettable journeys through the Himalayas. 
                Our expert local guides, personalized itineraries, and commitment to sustainable tourism 
                ensure authentic experiences.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Star, text: '25+ Years of Excellence' },
                  { icon: Compass, text: 'Certified Local Guides' },
                  { icon: MapPin, text: 'Customized Itineraries' },
                  { icon: Mountain, text: '24/7 Support' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 bg-[#ff7f50]/10 rounded-xl flex items-center justify-center group-hover:bg-[#ff7f50] transition-colors">
                        <Icon className="w-6 h-6 text-[#ff7f50] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-lg font-medium">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              <Link to="/destinations">
                <Button 
                  className="mt-8 bg-[#ff7f50] hover:bg-[#e86a3a] text-white rounded-full px-8 py-6"
                >
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513023840371-dd774fcaee9b?w=1920)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your <span className="text-[#ff7f50]">Adventure?</span>
            </h2>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
              Book your dream trip to Nepal today and create memories that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/destinations">
                <Button 
                  size="lg"
                  className="bg-[#ff7f50] hover:bg-[#e86a3a] text-white px-8 py-6 rounded-full text-lg"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 rounded-full text-lg"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
