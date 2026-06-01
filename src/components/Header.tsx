import React from 'react';
import { ShoppingBag, User, Sun, Moon, Globe } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Language } from '../types';
import { cn } from '../lib/utils';
import { translations } from '../lib/data';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart, onOpenProfile }) => {
  const { theme, toggleTheme, lang, setLang, cart } = useApp();
  
  const langs: Language[] = ['ge', 'en', 'ru'];
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg)] border-b border-[var(--border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-8 cursor-pointer">
          <div className="text-2xl font-black tracking-tighter text-[var(--color-primary-600)]">FarmDirect</div>
          {/* Navigation links could go here if we had routing */}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* LANG SWITCHER */}
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-[var(--border)] transition-colors flex items-center gap-1">
              <Globe className="w-5 h-5 text-[var(--text)]" />
              <span className="text-xs font-medium uppercase">{lang}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-32 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-[var(--border)]",
                    lang === l ? "font-bold text-green-500" : "text-[var(--text)]"
                  )}
                >
                  {l === 'ge' ? 'ქართული' : l === 'en' ? 'English' : 'Русский'}
                </button>
              ))}
            </div>
          </div>

          {/* THEME TOGGLE */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--border)] transition-colors text-[var(--text)]"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* PROFILE */}
          <button 
            onClick={onOpenProfile}
            className="p-2 rounded-full hover:bg-[var(--border)] transition-colors text-[var(--text)]"
          >
            <User className="w-5 h-5" />
          </button>

          {/* CART */}
          <button 
            onClick={onOpenCart}
            className="p-2 rounded-full hover:bg-[var(--border)] transition-colors relative text-[var(--text)] ml-2"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[var(--bg)] shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </div>
          </button>
          
        </div>
      </div>
    </header>
  );
};
