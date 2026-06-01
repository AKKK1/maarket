import React from 'react';
import { Product } from '../types';
import { useApp } from '../store/AppContext';
import { t } from '../lib/data';
import { Clock, Plus, Tag } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { lang, addToCart } = useApp();

  const handleAdd = () => {
    if (product.inStock) {
      addToCart({ ...product, quantity: 1 });
    }
  };

  return (
    <div className="group relative flex flex-col bg-[var(--card)] rounded-3xl p-4 border border-[var(--border)] shadow-sm hover:shadow-xl transition-shadow overflow-hidden">
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-2xl mb-4 overflow-hidden bg-gray-50 dark:bg-gray-800">
        <img 
          src={product.image} 
          alt={product.title[lang]} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
            !product.inStock && "grayscale opacity-60"
          )}
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {!product.inStock ? (
            <div className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
              {t(lang, 'outOfStock')}
            </div>
          ) : product.discountPrice ? (
            <div className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {t(lang, 'filters.discounted')}
            </div>
          ) : (
            <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
              {t(lang, 'inStock')}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        
        {/* Title */}
        <h3 className="font-bold text-lg mb-1 text-[var(--text)] line-clamp-2">
          {product.title[lang]}
        </h3>

        {/* Harvest Date Info */}
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-1">
          {product.harvestDate ? (
            <>
              <Clock className="w-3 h-3" />
              <span className="truncate max-w-[120px]" title={product.harvestDate}>{product.harvestDate}</span>
            </>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>

        {/* Bottom / Pricing & Action */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {product.discountPrice ? (
              <>
                <span className="text-[10px] line-through text-gray-400">
                  ₾{product.price.toFixed(2)}
                </span>
                <span className="text-xl font-black text-[var(--color-primary-600)]">
                  ₾{product.discountPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-black text-[var(--text)]">
                ₾{product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button 
            onClick={handleAdd}
            disabled={!product.inStock}
            className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl transition-colors",
              product.inStock 
                ? "bg-black text-white hover:bg-[var(--color-primary-600)]" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800"
            )}
            title={t(lang, 'addToCart')}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
      </div>
    </div>
  );
};
