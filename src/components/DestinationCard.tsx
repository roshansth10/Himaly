import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Destination } from '@/data/destinations';
import { formatDistance } from '@/utils/haversine';

interface DestinationCardProps {
  destination: Destination;
  distance?: number;
  index?: number;
  variant?: 'default' | 'compact' | 'featured' | 'grid';
}

export function DestinationCard({ 
  destination, 
  distance, 
  index = 0,
  variant = 'default' 
}: DestinationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const categoryColors: Record<string, string> = {
    Adventure: 'bg-orange-500',
    Cultural: 'bg-purple-500',
    Nature: 'bg-green-500',
    Pilgrimage: 'bg-amber-500',
    Wildlife: 'bg-emerald-500'
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08 }
  };

  const overlayVariants = {
    rest: { opacity: 0 },
    hover: { opacity: 1 }
  };

  const arrowVariants = {
    rest: { x: 0, opacity: 0 },
    hover: { x: 10, opacity: 1 }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <Link to={`/destination/${destination.id}`}>
          <motion.div
            className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-500"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={destination.images[0]}
                alt={destination.name}
                className="w-full h-full object-cover"
                variants={imageVariants}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <Badge 
                className={`absolute top-3 left-3 ${categoryColors[destination.category]} text-white border-0`}
              >
                {destination.category}
              </Badge>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 group-hover:text-[#ff7f50] transition-colors">
                {destination.name}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{destination.rating}</span>
                </div>
                <span className="text-[#ff7f50] font-bold">
                  {destination.price === 0 ? 'Free' : `NPR ${destination.price.toLocaleString()}`}
                </span>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="h-full"
    >
      <Link to={`/destination/${destination.id}`}>
        <motion.div
          className="group relative h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ y: -8 }}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
            <motion.img
              src={destination.images[0]}
              alt={destination.name}
              className="w-full h-full object-cover"
              variants={imageVariants}
              initial="rest"
              animate={isHovered ? 'hover' : 'rest'}
              transition={{ duration: 0.5 }}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              variants={overlayVariants}
              initial="rest"
              animate={isHovered ? 'hover' : 'rest'}
            />

            {/* Category Badge */}
            <Badge 
              className={`absolute top-4 left-4 ${categoryColors[destination.category]} text-white border-0 px-3 py-1`}
            >
              {destination.category}
            </Badge>

            {/* Like Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
              />
            </motion.button>

            {/* Price Tag */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-[#ff7f50] text-white px-4 py-2 rounded-full font-bold shadow-lg">
                {destination.price === 0 ? 'Free Entry' : `NPR ${destination.price.toLocaleString()}`}
              </div>
            </div>

            {/* Distance Badge */}
            {distance !== undefined && (
              <div className="absolute bottom-4 right-4">
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#ff7f50]" />
                  {formatDistance(distance)}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>{destination.location}, {destination.province}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-[#ff7f50] transition-colors line-clamp-1">
              {destination.name}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4 line-clamp-2">
              {destination.description}
            </p>

            {/* Attractions Preview */}
            <div className="flex flex-wrap gap-2 mb-4">
              {destination.attractions.slice(0, 3).map((attraction, i) => (
                <span 
                  key={i}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                >
                  {attraction}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{destination.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">({destination.reviewCount})</span>
              </div>

              <motion.div
                className="flex items-center gap-2 text-[#ff7f50] font-medium"
                variants={arrowVariants}
                initial="rest"
                animate={isHovered ? 'hover' : 'rest'}
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow: 'inset 0 0 0 2px rgba(255, 127, 80, 0.3)'
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
