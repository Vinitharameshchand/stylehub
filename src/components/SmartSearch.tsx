import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, X, Clock } from 'lucide-react';
import { aiService } from '../services/aiService';
import { Product } from '../types';

interface SmartSearchProps {
  products: Product[];
  onSearchResults: (results: Product[]) => void;
  placeholder?: string;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  products,
  onSearchResults,
  placeholder = "Search with AI..."
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const smartSuggestions = [
    'casual summer outfits',
    'formal business attire',
    'cozy winter sweaters',
    'trendy denim jackets',
    'elegant evening dresses',
    'comfortable activewear',
    'vintage style clothing',
    'minimalist wardrobe'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      onSearchResults(products);
      return;
    }

    setIsSearching(true);
    try {
      const results = await aiService.smartSearch(searchQuery, products);
      onSearchResults(results);
      
      // Save to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (error) {
      console.error('Search failed:', error);
      onSearchResults([]);
    } finally {
      setIsSearching(false);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      const filtered = smartSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      onSearchResults(products);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    onSearchResults(products);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-lg">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {isSearching ? (
            <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Recent Searches</span>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(search)}
                  className="block w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">AI Suggestions</span>
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(suggestion)}
                  className="block w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-purple-50 rounded transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {query.length === 0 && recentSearches.length === 0 && (
            <div className="p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Try searching for:</span>
              </div>
              {smartSuggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(suggestion)}
                  className="block w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-purple-50 rounded transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};