import React from 'react';
import { categories } from '../data/products';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="border-b border-gray-200 mb-8">
      <div className="flex space-x-8 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors
              ${selectedCategory === category
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};