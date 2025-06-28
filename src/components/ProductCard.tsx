import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  onStyleAssistant?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  onStyleAssistant
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
  };

  return (
    <div
      className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            NEW
          </span>
        )}
        
        {product.isOnSale && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            SALE
          </span>
        )}

        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {product.isOnSale && <div className="h-6"></div>}
          
          <button
            onClick={() => onToggleWishlist(product)}
            className={`p-2 rounded-full transition-all duration-200 ${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>

          {onStyleAssistant && (
            <button
              onClick={() => onStyleAssistant(product)}
              className="bg-white text-purple-600 p-2 rounded-full hover:bg-purple-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <Sparkles className="h-4 w-4" />
            </button>
          )}
        </div>

        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end justify-center pb-4 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.brand}</p>
        </div>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviewCount})</span>
        </div>

        <div className="mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {product.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {product.colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};