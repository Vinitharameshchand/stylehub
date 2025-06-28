import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CategoryTabs } from './components/CategoryTabs';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { AIRecommendations } from './components/AIRecommendations';
import { StyleAssistant } from './components/StyleAssistant';
import { useCart } from './hooks/useCart';
import { useWishlist } from './hooks/useWishlist';
import { products } from './data/products';
import { FilterState, Product } from './types';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isStyleAssistantOpen, setIsStyleAssistantOpen] = useState(false);
  const [selectedProductForStyling, setSelectedProductForStyling] = useState<Product | undefined>();
  const [searchResults, setSearchResults] = useState<Product[]>(products);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
    rating: 0
  });

  const cart = useCart();
  const wishlist = useWishlist();

  const filteredProducts = useMemo(() => {
    let productsToFilter = searchResults;
    
    return productsToFilter.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Advanced filters
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      if (filters.sizes.length > 0 && !filters.sizes.some(size => product.sizes.includes(size))) {
        return false;
      }

      if (filters.colors.length > 0 && !filters.colors.some(color => product.colors.includes(color))) {
        return false;
      }

      if (product.price > filters.priceRange[1]) {
        return false;
      }

      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      return true;
    });
  }, [searchResults, selectedCategory, filters]);

  const handleStyleAssistant = (product?: Product) => {
    setSelectedProductForStyling(product);
    setIsStyleAssistantOpen(true);
  };

  const viewedProducts = cart.cartItems.map(item => item.product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cart.getTotalItems()}
        onCartClick={() => cart.setIsCartOpen(true)}
        onMenuClick={() => setIsSidebarOpen(true)}
        onSearchResults={setSearchResults}
        products={products}
        onStyleAssistantClick={() => handleStyleAssistant()}
      />

      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          filters={filters}
          onFilterChange={setFilters}
        />

        <main className="flex-1 lg:ml-64 xl:ml-72">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Discover Your Style
              </h1>
              <p className="text-gray-600">
                Premium clothing collection powered by AI recommendations
              </p>
            </div>

            {/* AI Recommendations Section */}
            <div className="mb-8">
              <AIRecommendations
                userId="user123"
                viewedProducts={viewedProducts}
                onAddToCart={cart.addToCart}
                onToggleWishlist={(product) => {
                  if (wishlist.isInWishlist(product.id)) {
                    wishlist.removeFromWishlist(product.id);
                  } else {
                    wishlist.addToWishlist(product);
                  }
                }}
              />
            </div>

            <CategoryTabs
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
              </p>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Best Rating</option>
                <option>AI Recommended</option>
              </select>
            </div>

            <ProductGrid
              products={filteredProducts}
              onAddToCart={cart.addToCart}
              onToggleWishlist={(product) => {
                if (wishlist.isInWishlist(product.id)) {
                  wishlist.removeFromWishlist(product.id);
                } else {
                  wishlist.addToWishlist(product);
                }
              }}
              isInWishlist={wishlist.isInWishlist}
              onStyleAssistant={handleStyleAssistant}
            />

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or browse different categories
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Cart
        isOpen={cart.isCartOpen}
        onClose={() => cart.setIsCartOpen(false)}
        items={cart.cartItems}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeFromCart}
        totalPrice={cart.getTotalPrice()}
      />

      <StyleAssistant
        isOpen={isStyleAssistantOpen}
        onClose={() => setIsStyleAssistantOpen(false)}
        selectedProduct={selectedProductForStyling}
        allProducts={products}
        onAddToCart={cart.addToCart}
      />
    </div>
  );
}

export default App;