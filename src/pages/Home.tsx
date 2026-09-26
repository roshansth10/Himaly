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
import { SEO } from '@/components/SEO';
import heroImg from '/img/hero.jpeg';

export function Home() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [nearestDestinations, setNearestDestinations] = useState<typeof destinations>([]);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920',
    heroImg,
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

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
    <div className="min-h-screen overflow-x-hidden">
      <SEO
        title="Himaly | Nepal Tour Packages, Himalayan Treks & Adventure Destinations"
        description="Plan your Nepal trip with Himaly. Browse trekking routes, UNESCO heritage sites, wildlife safaris and mountain adventures across all seven provinces, with local guides and custom itineraries."
        canonicalPath="/"
        ogImage="/img/hero.jpeg"
      />
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#1B2A4A]/60 via-[#1B2A4A]/40 to-[#1B2A4A]/70" />
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Compass className="w-4 h-4 text-[#E8672A]" />
              <span className="text-white/90 text-sm">Himaly – Discover the Soul of Nepal</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight"
          >
            <span className="block">Discover</span>
            <span className="block text-[#E8672A]">Nepal's</span>
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link to="/destinations">
              <Button 
                size="lg"
                className="h-auto bg-[#E8672A] hover:bg-[#c85a22] text-white px-6 sm:px-8 has-[>svg]:px-6 sm:has-[>svg]:px-8 py-4 sm:py-6 rounded-full text-base sm:text-lg font-medium transition-all hover:shadow-xl hover:shadow-[#E8672A]/30 hover:-translate-y-1"
              >
                Explore Destinations
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              className="h-auto border-2 border-white/40 text-white bg-transparent hover:bg-white hover:text-gray-900 dark:bg-transparent dark:border-white/40 dark:text-white dark:hover:bg-white dark:hover:text-gray-900 px-6 sm:px-8 has-[>svg]:px-6 sm:has-[>svg]:px-8 py-4 sm:py-6 rounded-full text-base sm:text-lg font-medium backdrop-blur-sm transition-colors"
            >
              <Play className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Watch Video
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
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
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-[#FBF7F2] dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Explore by <span className="text-[#E8672A]">Category</span>
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
                  <Link to={`/destinations?category=${category.id}`} className="block h-full">
                    <motion.div
                      whileHover={{ y: -6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative h-40 sm:h-52 w-full rounded-2xl overflow-hidden p-4 sm:p-5 flex flex-col justify-end text-center shadow-lg hover:shadow-2xl border border-white/10 dark:border-gray-700/50 cursor-pointer transition-all duration-300"
                    >
                      {/* Category Image strictly within this rectangle */}
                      {category.image && (
                        <img
                          src={category.image}
                          alt={`${category.name} destinations in Nepal${category.tagline ? ` — ${category.tagline}` : ''}`}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      )}

                      {/* Gradient Overlay for optimal readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/85 via-[#1B2A4A]/45 to-[#1B2A4A]/20 group-hover:from-[#1B2A4A]/90 group-hover:via-[#1B2A4A]/55 transition-colors duration-300" />

                      {/* Content within rectangle */}
                      <div className="relative z-10 flex flex-col items-center">
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 mb-2 text-white group-hover:text-[#E8672A] group-hover:scale-110 transition-all duration-300 drop-shadow-md" />
                        <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#E8672A] transition-colors drop-shadow-sm">
                          {category.name}
                        </h3>
                        {category.tagline && (
                          <span className="text-[11px] sm:text-xs text-gray-200/90 font-medium group-hover:text-white transition-colors mt-0.5 line-clamp-1">
                            {category.tagline}
                          </span>
                        )}
                      </div>
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
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Popular <span className="text-[#E8672A]">Destinations</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl">
                Explore Nepal's most beloved travel experiences, handpicked for unforgettable adventures
              </p>
            </div>
            <Link to="/destinations">
              <Button 
                variant="outline" 
                className="mt-4 md:mt-0 border-[#E8672A] text-[#E8672A] hover:bg-[#E8672A] hover:text-white rounded-full px-6 has-[>svg]:px-6"
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
        <section className="py-20 bg-gradient-to-b from-[#E8672A]/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#E8672A] rounded-full flex items-center justify-center shadow-lg shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  Nearest to You
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed mt-4 max-w-3xl">
                Discover destinations closest to your current location for spontaneous adventures and weekend getaways
              </p>
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
                  alt="Ornate Newari temple with carved wooden windows and tiered pagoda roofs in the Kathmandu Valley, Nepal"
                  className="w-full h-[320px] sm:h-[420px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/50 to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-[#E8672A] rounded-2xl flex flex-col items-center justify-center text-white shadow-xl"
              >
                <span className="text-3xl sm:text-4xl font-bold">25+</span>
                <span className="text-xs sm:text-sm">Years</span>
              </motion.div>

              {/* Orbital Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -left-4 w-24 h-24 border-2 border-dashed border-[#E8672A]/30 rounded-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Why Choose <span className="text-[#E8672A]">Nepal Travel</span>
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
                      <div className="w-12 h-12 bg-[#E8672A]/10 rounded-xl flex items-center justify-center group-hover:bg-[#E8672A] transition-colors">
                        <Icon className="w-6 h-6 text-[#E8672A] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-lg font-medium">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              <Link to="/destinations">
                <Button 
                  className="mt-8 h-auto bg-[#E8672A] hover:bg-[#c85a22] text-white rounded-full px-6 sm:px-8 has-[>svg]:px-6 sm:has-[>svg]:px-8 py-4 sm:py-6"
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
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/img/categories/adventure.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/80 via-[#1B2A4A]/60 to-[#1B2A4A]/80" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your <span className="text-[#E8672A]">Adventure?</span>
            </h2>
            <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
              Book your dream trip to Nepal today and create memories that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/destinations">
                <Button 
                  size="lg"
                  className="h-auto bg-[#E8672A] hover:bg-[#c85a22] text-white px-6 sm:px-8 has-[>svg]:px-6 sm:has-[>svg]:px-8 py-4 sm:py-6 rounded-full text-base sm:text-lg"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg"
                  variant="outline"
                  className="h-auto border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 dark:bg-transparent dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900 px-6 sm:px-8 py-4 sm:py-6 rounded-full text-base sm:text-lg font-medium transition-all shadow-md"
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
