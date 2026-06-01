import React from 'react';
import { useApp } from '../store/AppContext';
import { t } from '../lib/data';
import { SlidersHorizontal, ArrowDownAZ, ArrowUpZA, Zap, CheckCircle2, Tag } from 'lucide-react';
import { cn } from '../lib/utils';

interface FiltersProps {
  filters: {
    promos: boolean;
    inStock: boolean;
    discounted: boolean;
    sort: 'old' | 'new' | null;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const { lang } = useApp();

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSort = () => {
    setFilters((prev: any) => ({
      ...prev,
      sort: prev.sort === 'new' ? 'old' : prev.sort === 'old' ? null : 'new'
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 mr-2 text-gray-500">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Filters</span>
        </div>

        <button
          onClick={() => toggleFilter('promos')}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors border",
            filters.promos 
              ? "bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)]" 
              : "bg-white text-[var(--text)] border-[var(--border)] hover:bg-gray-50 dark:bg-[var(--card)] dark:hover:bg-white/5"
          )}
        >
          {t(lang, 'filters.onlyPromos')}
        </button>

        <button
          onClick={() => toggleFilter('inStock')}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors border",
            filters.inStock 
              ? "bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)]" 
              : "bg-white text-[var(--text)] border-[var(--border)] hover:bg-gray-50 dark:bg-[var(--card)] dark:hover:bg-white/5"
          )}
        >
          {t(lang, 'filters.inStock')}
        </button>

        <button
          onClick={() => toggleFilter('discounted')}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors border",
            filters.discounted 
              ? "bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)]" 
              : "bg-white text-[var(--text)] border-[var(--border)] hover:bg-gray-50 dark:bg-[var(--card)] dark:hover:bg-white/5"
          )}
        >
          {t(lang, 'filters.discounted')}
        </button>

        <button
          onClick={toggleSort}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors border ml-auto sm:ml-0",
            filters.sort 
              ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white" 
              : "bg-transparent text-[var(--text)] border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
          )}
        >
          {filters.sort === 'new' ? (
            <><ArrowDownAZ className="w-3.5 h-3.5" /> {t(lang, 'filters.newToOld')}</>
          ) : filters.sort === 'old' ? (
            <><ArrowUpZA className="w-3.5 h-3.5" /> {t(lang, 'filters.oldToNew')}</>
          ) : (
            <><ArrowDownAZ className="w-3.5 h-3.5" /> Sort</>
          )}
        </button>
      </div>
    </div>
  );
};
