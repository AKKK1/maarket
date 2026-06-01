import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, CartItem } from '../types';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  userBalance: number;
  setUserBalance: (val: number) => void;
  cookiesAccepted: boolean;
  setCookiesAccepted: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Language>('ge');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userBalance, setUserBalance] = useState(20.0);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
    
    const savedLang = localStorage.getItem('lang') as Language | null;
    if (savedLang) setLang(savedLang);
    
    const cookies = localStorage.getItem('cookiesAccepted');
    if (cookies === 'true') setCookiesAccepted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const updateLang = (l: Language) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  const acceptCookies = () => {
    setCookiesAccepted(true);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        setLang: updateLang,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        userBalance,
        setUserBalance,
        cookiesAccepted,
        setCookiesAccepted: acceptCookies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
