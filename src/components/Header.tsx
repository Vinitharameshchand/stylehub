import React, { useState } from 'react';
import { ShoppingBag, Heart, User, Menu, Sparkles } from 'lucide-react';
import { SmartSearch } from './SmartSearch';
import { Product } from '../types';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  onSearchResults: (results: Product[]) => void;
  products: Product[];
  onStyleAssistantClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  cartItemCount, 
  onCartClick, 
  onMenuClick, 
  onSearchResults, 
  products,
  onStyleAssistantClick 
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-slate-800">StyleHub</h1>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SmartSearch 
              products={products}
              onSearchResults={onSearchResults}
              placeholder="Search with AI..."
            />
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onStyleAssistantClick}
              className="hidden md:flex items-center space-x-1 px-3 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI Stylist</span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <SmartSearch 
            products={products}
            onSearchResults={onSearchResults}
            placeholder="Search with AI..."
          />
        </div>
      </div>
    </header>
  );
};