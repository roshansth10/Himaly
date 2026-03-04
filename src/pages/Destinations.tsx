import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SlidersHorizontal, 
  MapPin, 
  Star, 
  TrendingUp, 
  DollarSign,
  Grid3X3,
  LayoutGrid,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { DestinationCard } from '@/components/DestinationCard';
import { destinations, categories } from '@/data/destinations';
import { getUserLocation, getDistance } from '@/utils/haversine';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type SortOption = 'popular' | 'nearest' | 'cheapest' | 'rating';

export function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { ref } = useScrollAnimation();

  // Get user location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };
    fetchLocation();
  }, []);

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        dest =>
          dest.name.toLowerCase().includes(query) ||
          dest.location.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query) ||
          dest.category.toLowerCase().includes(query) ||
          dest.attractions.some(attr => attr.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(dest => dest.category === selectedCategory);
    }

    // Price filter
    result = result.filter(dest => dest.price >= priceRange[0] && dest.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'nearest':
        if (userLocation) {
          result.sort((a, b) => {
            const distA = getDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
            const distB = getDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
            return distA - distB;
          });
        }
        break;
      case 'cheapest':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, priceRange, userLocation]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 15000]);
    setSortBy('popular');
    setSearchParams({});
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory !== 'all',
    priceRange[0] > 0 || priceRange[1] < 15000
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#ff7f50]/10 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Explore <span className="text-[#ff7f50]">Destinations</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Discover Nepal's most incredible places, from towering peaks to ancient temples
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section ref={ref} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl"
                />
              </div>

              {/* Category Select */}
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-[#ff7f50] text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="relative"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-[#ff7f50] text-white">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Sort Options */}
                      <div>
                        <label className="text-sm font-medium mb-3 block">Sort By</label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { value: 'popular', label: 'Most Popular', icon: TrendingUp },
                            { value: 'nearest', label: 'Nearest', icon: MapPin },
                            { value: 'cheapest', label: 'Cheapest', icon: DollarSign },
                            { value: 'rating', label: 'Highest Rated', icon: Star },
                          ].map((option) => {
                            const Icon = option.icon;
                            return (
                              <button
                                key={option.value}
                                onClick={() => setSortBy(option.value as SortOption)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                  sortBy === option.value
                                    ? 'bg-[#ff7f50] text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div>
                        <label className="text-sm font-medium mb-3 block">
                          Price Range: NPR {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                        </label>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={15000}
                          step={500}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {activeFiltersCount > 0 && (
                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="ghost"
                          onClick={clearFilters}
                          className="text-gray-500"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Clear All Filters
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredDestinations.length}</span> destinations
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#ff7f50] text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'compact' ? 'bg-[#ff7f50] text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {filteredDestinations.map((destination, index) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  distance={userLocation ? getDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    destination.latitude,
                    destination.longitude
                  ) : undefined}
                  index={index}
                  variant={viewMode}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No destinations found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
