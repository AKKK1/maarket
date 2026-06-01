import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { t } from '../lib/data';
import { X, Gift } from 'lucide-react';

export const CookieAndPromoModal: React.FC = () => {
  const { lang, cookiesAccepted, setCookiesAccepted } = useApp();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show after slight delay to not immediately block view
    if (!cookiesAccepted) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [cookiesAccepted]);

  if (!show) return null;

  const handleAccept = () => {
    setCookiesAccepted(true);
    setShow(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[var(--card)] w-[400px] max-w-full rounded-[40px] p-8 shadow-2xl relative border border-[var(--border)]"
        >
          {/* Close button */}
          <button 
            onClick={() => setShow(false)}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
          >
             <X className="w-4 h-4 text-gray-900 dark:text-white" />
          </button>

          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-3xl flex items-center justify-center mb-6 mx-auto">
             <Gift className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2 text-[var(--text)]">
            {t(lang, 'promoModalTitle')}
          </h2>
          <p className="text-center text-gray-500 text-xs mb-8">
            {t(lang, 'promoModalText')}
          </p>

          <button
            onClick={handleAccept}
            className="w-full py-4 bg-[var(--color-primary-600)] text-white rounded-2xl font-bold tracking-wide shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-[var(--color-primary-700)] transition-colors"
          >
            {t(lang, 'acceptCookies')}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
