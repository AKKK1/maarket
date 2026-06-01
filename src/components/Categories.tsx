import React from 'react';
import { useApp } from '../store/AppContext';
import { t } from '../lib/data';
import { ChevronDown } from 'lucide-react';

const categoriesList = [
  { id: 'all', icon: '🧺', name: { ge: 'ყველა', en: 'All', ru: 'Все' } },
  { id: 'vegetables', icon: '🥕', name: { ge: 'ბოსტნეული', en: 'Vegetables', ru: 'Овощи' } },
  { id: 'fruits', icon: '🍎', name: { ge: 'ხილი', en: 'Fruits', ru: 'Фрукты' } },
  { id: 'dairy', icon: '🧀', name: { ge: 'რძის ნაწარმი', en: 'Dairy', ru: 'Молочные' } },
  { id: 'honey', icon: '🍯', name: { ge: 'თაფლი', en: 'Honey', ru: 'Мёд' } },
];

interface CategoriesProps {
  selected: string;
  onSelect: (id: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ selected, onSelect }) => {
  const { lang, theme } = useApp();
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-bold text-[var(--text)]">
          {t(lang, 'categories')}
        </h3>
        {/* Dropdown for mobile, invisible on large but let's keep it simple as horizontal scroll for modern feel */}
        <div className="group relative sm:hidden">
          <button className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[var(--text)]">
            More <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Horizontal Scroll Area */}
      <div className="flex gap-3 overflow-x-auto pb-4 pt-1 snap-x data-hide-scrollbar" data-hide-scrollbar>
        {categoriesList.map(cat => {
          const isSelected = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex-none snap-start group relative flex items-center gap-2 px-5 py-3 rounded-xl border transition-colors ${
                isSelected 
                  ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm' 
                  : 'bg-white text-[var(--text)] border-[var(--border)] hover:bg-gray-50 dark:bg-[var(--card)] dark:hover:bg-white/5'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="font-medium text-sm whitespace-nowrap">
                {cat.name[lang]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
