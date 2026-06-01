import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, LogOut, Wallet, Star, Package, RefreshCw, XCircle } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { t } from '../lib/data';

export const ProfileDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { lang, userBalance, setUserBalance } = useApp();

  const handleTopUp = () => {
    // Mock top up logic
    setUserBalance(userBalance + 50);
    alert('Top up simulated (+50 GEL)');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[var(--bg)] border-l border-[var(--border)] z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <h2 className="text-xl font-display font-bold">{t(lang, 'profile')}</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--border)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pt-2">
              {/* User Identity */}
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-500" />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold">Giorgi User</h3>
                   <p className="text-sm text-gray-500">giorgi@example.com</p>
                 </div>
              </div>

              {/* Stats / Balance */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                 {/* Balance Block */}
                 <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-4 rounded-3xl text-white shadow-lg shadow-green-500/20">
                    <div className="flex justify-between items-start mb-2">
                      <Wallet className="w-5 h-5 opacity-80" />
                    </div>
                    <p className="text-sm opacity-90 font-medium">Balance</p>
                    <p className="text-2xl font-bold">₾{userBalance.toFixed(2)}</p>
                    <button 
                      onClick={handleTopUp}
                      className="mt-3 w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-colors uppercase tracking-wider"
                    >
                      {t(lang, 'topUp')}
                    </button>
                 </div>

                 {/* Points Block */}
                 <div className="bg-gradient-to-br from-purple-500 to-indigo-700 p-4 rounded-3xl text-white shadow-lg shadow-purple-500/20 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <Star className="w-5 h-5 opacity-80" />
                    </div>
                    <p className="text-sm opacity-90 font-medium">Farm Points</p>
                    <p className="text-2xl font-bold">1,250</p>
                    <div className="mt-auto pt-2 text-[10px] opacity-80 leading-tight">
                       Earn 1 point per ₾ spent. Reach 2000 for a free gift!
                    </div>
                 </div>
              </div>

              {/* Order History */}
              <h4 className="font-display font-bold text-lg mb-4">{t(lang, 'orderHistory')}</h4>
              
              <div className="space-y-3">
                 {/* Mock Order 1 */}
                 <div className="p-4 border border-[var(--border)] rounded-2xl bg-[var(--card)]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500">ORD-1092 • 2 days ago</span>
                      <span className="text-[10px] font-bold px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" /> On the way
                      </span>
                    </div>
                    <p className="font-medium text-sm">3x Organic Tomato, 1x Honey</p>
                    <p className="text-sm font-bold mt-2">₾25.50</p>
                 </div>

                 {/* Mock Order 2 */}
                 <div className="p-4 border border-[var(--border)] rounded-2xl bg-[var(--card)]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500">ORD-1088 • Last week</span>
                      <span className="text-[10px] font-bold px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center gap-1">
                        <Package className="w-3 h-3" /> Delivered
                      </span>
                    </div>
                    <p className="font-medium text-sm">2x Fresh Strawberry</p>
                    <p className="text-sm font-bold mt-2">₾19.00</p>
                 </div>

                 {/* Mock Order 3 (Cancelled) */}
                 <div className="p-4 border border-[var(--border)] rounded-2xl bg-[var(--card)] opacity-60">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500">ORD-1080 • 2 weeks ago</span>
                      <span className="text-[10px] font-bold px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Cancelled
                      </span>
                    </div>
                    <p className="font-medium text-sm">1x Village Cucumber</p>
                    <p className="text-sm font-bold mt-2 line-through">₾3.20</p>
                 </div>
              </div>
            </div>

            <div className="p-6 border-t border-[var(--border)]">
              <button className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors w-full justify-center">
                 <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
