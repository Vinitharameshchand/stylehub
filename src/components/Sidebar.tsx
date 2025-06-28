import React from 'react';
import { X } from 'lucide-react';
import { categories, brands, sizes, colors } from '../data/products';
import { FilterState } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, filters, onFilterChange }) => {
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    
    onFilterChange({ ...filters, colors: newColors });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      sizes: [],
      colors: [],
      priceRange: [0, 1000],
      rating: 0
    });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white transform transition-transform duration-300 ease-in-out
        lg:transform-none lg:z-auto lg:w-64 xl:w-72
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-md">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="hidden lg:flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={clearAllFilters}
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-8">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.slice(1).map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-600">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Brands</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Sizes</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`
                      px-3 py-2 text-sm border rounded-md transition-colors
                      ${filters.sizes.includes(size)
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Colors</h3>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`
                      h-8 w-8 rounded-full border-2 transition-all
                      ${filters.colors.includes(color)
                        ? 'border-amber-500 scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                    style={{
                      backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                     color.toLowerCase() === 'black' ? '#000000' :
                                     color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                     color.toLowerCase() === 'gray' ? '#6b7280' :
                                     color.toLowerCase() === 'blue' ? '#3b82f6' :
                                     color.toLowerCase() === 'light blue' ? '#7dd3fc' :
                                     color.toLowerCase() === 'pink' ? '#ec4899' :
                                     color.toLowerCase() === 'khaki' ? '#a3a380' :
                                     color.toLowerCase() === 'olive' ? '#84cc16' :
                                     color.toLowerCase() === 'cream' ? '#fef3c7' :
                                     color.toLowerCase() === 'burgundy' ? '#7c2d12' :
                                     color.toLowerCase() === 'charcoal' ? '#374151' :
                                     '#d1d5db'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => onFilterChange({ ...filters, rating })}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                    />
                    <div className="ml-3 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};