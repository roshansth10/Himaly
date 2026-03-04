import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X, Compass } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { destinations } from '@/data/destinations';

interface SearchBarProps {
  variant?: 'hero' | 'navbar' | 'page';
  onSearch?: (query: string) => void;
}

export function SearchBar({ variant = 'page', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof destinations>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 1) {
      const filtered = destinations.filter(
        dest =>
          dest.name.toLowerCase().includes(query.toLowerCase()) ||
          dest.location.toLowerCase().includes(query.toLowerCase()) ||
          dest.category.toLowerCase().includes(query.toLowerCase()) ||
          dest.attractions.some(attr => attr.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/destinations?search=${encodeURIComponent(query)}`);
      }
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (destinationId: string) => {
    navigate(`/destination/${destinationId}`);
    setQuery('');
    setSuggestions([]);
    setIsFocused(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  if (variant === 'hero') {
    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl border transition-all duration-300 ${
              isFocused 
                ? 'border-[#ff7f50] shadow-lg shadow-[#ff7f50]/20 bg-white/20' 
                : 'border-white/30 hover:border-white/50'
            }`}
          >
            <div className="pl-5">
              <Compass className="w-5 h-5 text-white/70" />
            </div>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search Pokhara, Everest, Lumbini..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="flex-1 bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 py-6 text-lg"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            )}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mr-2 px-6 py-3 bg-[#ff7f50] hover:bg-[#e86a3a] text-white rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Search</span>
            </motion.button>
          </motion.div>
        </form>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {isFocused && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              {suggestions.map((dest, index) => (
                <motion.button
                  key={dest.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSuggestionClick(dest.id)}
                  className="w-full px-5 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <img
                    src={dest.images[0]}
                    alt={dest.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{dest.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {dest.location}
                    </p>
                  </div>
                  <span className="text-sm text-[#ff7f50] font-medium">{dest.category}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === 'navbar') {
    return (
      <form onSubmit={handleSubmit} className="hidden md:block">
        <div className={`relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-full transition-all duration-300 ${
          isFocused ? 'ring-2 ring-[#ff7f50]' : ''
        }`}>
          <Search className="absolute left-4 w-4 h-4 text-gray-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search destinations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-64 pl-10 pr-4 py-2 bg-transparent border-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </form>
    );
  }

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-300 ${
          isFocused ? 'border-[#ff7f50] shadow-lg shadow-[#ff7f50]/10' : 'border-gray-200 dark:border-gray-700'
        }`}>
          <Search className="absolute left-4 w-5 h-5 text-gray-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search destinations, attractions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="flex-1 pl-12 pr-12 py-4 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100 dark:border-gray-700"
          >
            {suggestions.map((dest, index) => (
              <motion.button
                key={dest.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(dest.id)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <img
                  src={dest.images[0]}
                  alt={dest.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{dest.name}</p>
                  <p className="text-xs text-gray-500">{dest.location}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
