import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Heart, ShoppingBag } from 'lucide-react';
import { aiService } from '../services/aiService';
import { Product } from '../types';

interface AIRecommendationsProps {
  userId: string;
  viewedProducts: string[];
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  userId,
  viewedProducts,
  onAddToCart,
  onToggleWishlist
}) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true);
        const recs = await aiService.getRecommendations(userId, viewedProducts, {});
        setRecommendations(recs);
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [userId, viewedProducts]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
          <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-2"></div>
              <div className="bg-gray-200 h-4 rounded mb-1"></div>
              <div className="bg-gray-200 h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
        </div>
        <div className="flex items-center space-x-1 text-sm text-purple-600">
          <TrendingUp className="h-4 w-4" />
          <span>Powered by AI</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.slice(0, 4).map((item, index) => (
          <div key={item.id} className="group relative">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                  <Sparkles className="h-3 w-3" />
                  <span>{Math.round(item.confidence * 100)}%</span>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onToggleWishlist(item)}
                  className="bg-white p-1.5 rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="font-medium text-sm text-gray-900 line-clamp-2">{item.name}</h3>
              <p className="text-xs text-gray-600">{item.brand}</p>
              <p className="text-sm font-semibold text-gray-900">${item.price.toFixed(2)}</p>
              <p className="text-xs text-purple-600">{item.reason}</p>
            </div>

            <button
              onClick={() => onAddToCart(item, 'M', item.colors?.[0] || 'Black')}
              className="w-full mt-2 bg-gray-900 text-white text-xs py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center space-x-1"
            >
              <ShoppingBag className="h-3 w-3" />
              <span>Add to Cart</span>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors">
          View All AI Recommendations →
        </button>
      </div>
    </div>
  );
};