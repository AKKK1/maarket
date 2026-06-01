import React, { useState } from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { Categories } from '../components/Categories';
import { Filters } from '../components/Filters';
import { ProductCard } from '../components/ProductCard';
import { sampleProducts } from '../lib/data';

export const Home: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('all');
  const [filters, setFilters] = useState({
    promos: false,
    inStock: false,
    discounted: false,
    sort: null as 'old' | 'new' | null,
  });

  // Apply filters
  let filteredProducts = [...sampleProducts];
  
  if (selectedCat !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCat);
  }
  
  if (filters.inStock) {
    filteredProducts = filteredProducts.filter(p => p.inStock);
  }
  
  if (filters.discounted) {
    filteredProducts = filteredProducts.filter(p => !!p.discountPrice);
  }

  // Not implementing promos purely as data structure is simple, but would filter by some 'isPromo' flag.
  
  // Sorting (Mock implementation: new to old reverses array for demo purposes)
  if (filters.sort === 'new') {
    filteredProducts = [...filteredProducts].reverse();
  }

  return (
    <main className="min-h-screen pb-20">
      <HeroCarousel />
      <Categories selected={selectedCat} onSelect={setSelectedCat} />
      <Filters filters={filters} setFilters={setFilters} />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </main>
  );
};
