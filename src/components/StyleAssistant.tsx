import React, { useState } from 'react';
import { Sparkles, Palette, TrendingUp, X, RefreshCw } from 'lucide-react';
import { aiService } from '../services/aiService';
import { Product } from '../types';

interface StyleAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product;
  allProducts: Product[];
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const StyleAssistant: React.FC<StyleAssistantProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  allProducts,
  onAddToCart
}) => {
  const [outfitSuggestions, setOutfitSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'outfit' | 'trends' | 'size'>('outfit');

  const generateOutfit = async () => {
    if (!selectedProduct) return;
    
    setLoading(true);
    try {
      const suggestions = await aiService.generateOutfitSuggestions(selectedProduct, allProducts);
      setOutfitSuggestions(suggestions);
    } catch (error) {
      console.error('Failed to generate outfit:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && selectedProduct && activeTab === 'outfit') {
      generateOutfit();
    }
  }, [isOpen, selectedProduct, activeTab]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900">AI Style Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex space-x-1 mt-4">
            {[
              { id: 'outfit', label: 'Outfit', icon: Palette },
              { id: 'trends', label: 'Trends', icon: TrendingUp },
              { id: 'size', label: 'Size', icon: Sparkles }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {selectedProduct && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex space-x-3">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-600">{selectedProduct.brand}</p>
                  <p className="text-sm font-semibold text-gray-900">${selectedProduct.price}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'outfit' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Complete the Look</h3>
                <button
                  onClick={generateOutfit}
                  disabled={loading}
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm font-medium disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse flex space-x-3">
                      <div className="bg-gray-200 w-16 h-16 rounded-md"></div>
                      <div className="flex-1 space-y-2">
                        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                        <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {outfitSuggestions.map((item, index) => (
                    <div key={item.id} className="flex space-x-3 p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.brand}</p>
                        <p className="text-sm font-semibold text-gray-900">${item.price}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Sparkles className="h-3 w-3 text-purple-500" />
                            <span className="text-xs text-purple-600">
                              {Math.round(item.compatibility * 100)}% match
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onAddToCart(item, 'M', item.colors?.[0] || 'Black')}
                          className="mt-2 w-full bg-gray-900 text-white text-xs py-1.5 rounded-md hover:bg-gray-800 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'trends' && (
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Style Trends</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Trending Now</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Oversized blazers</li>
                    <li>• Earth tone palettes</li>
                    <li>• Sustainable fabrics</li>
                    <li>• Minimalist accessories</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Color of the Season</h4>
                  <p className="text-sm text-gray-600">
                    Sage green and warm terracotta are dominating this season's palette.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'size' && selectedProduct && (
            <div>
              <h3 className="font-medium text-gray-900 mb-4">AI Size Recommendation</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-800">Recommended: Size M</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Based on your previous purchases and this item's fit data.
                  </p>
                  <div className="mt-2 text-xs text-green-600">
                    95% confidence • Perfect fit predicted
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Size Guide</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Chest:</span>
                      <span>38-40 inches</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Length:</span>
                      <span>28 inches</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fit:</span>
                      <span>Regular</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};