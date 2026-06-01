import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Wallet, Info } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { t } from '../lib/data';
import { cn } from '../lib/utils';

export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, userBalance, lang } = useApp();
  
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [driverNote, setDriverNote] = useState('');
  const [useBalance, setUseBalance] = useState(false);

  const subtotal = cart.reduce((acc, item) => {
    const price = item.discountPrice || item.price;
    return acc + (price * item.quantity);
  }, 0);

  // Example courier calculation: very basic rules inside UI. Real logic in backend.
  const deliveryCost = deliveryType === 'delivery' ? (subtotal > 20 ? 0 : 5) : 0; 
  const total = subtotal + deliveryCost;

  const maxBalanceToUse = Math.min(userBalance, total);
  const finalToPay = useBalance ? total - maxBalanceToUse : total;

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
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--bg)] border-l border-[var(--border)] z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <h2 className="text-xl font-display font-bold">{t(lang, 'cart')}</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--border)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">Cart is empty</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-3xl bg-[var(--card)] border border-[var(--border)]">
                    <img src={item.image} alt={item.title[lang]} className="w-20 h-20 rounded-2xl object-cover" />
                    <div className="flex-1 flex flex-col">
                      <h4 className="font-semibold text-sm line-clamp-1">{item.title[lang]}</h4>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="font-bold">₾{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full dark:hover:bg-red-500/10 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Extras block if items exist */}
              {cart.length > 0 && (
                <div className="mt-4 flex flex-col gap-4">
                  {/* Delivery Type */}
                  <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                    <button 
                      onClick={() => setDeliveryType('delivery')}
                      className={cn("flex-1 py-2 text-sm font-semibold rounded-xl transition-all", deliveryType === 'delivery' ? "bg-white dark:bg-gray-700 shadow-sm text-[var(--text)]" : "text-gray-500")}
                    >
                      {t(lang, 'delivery')}
                    </button>
                    <button 
                      onClick={() => setDeliveryType('pickup')}
                      className={cn("flex-1 py-2 text-sm font-semibold rounded-xl transition-all", deliveryType === 'pickup' ? "bg-white dark:bg-gray-700 shadow-sm text-[var(--text)]" : "text-gray-500")}
                    >
                      {t(lang, 'pickup')}
                    </button>
                  </div>

                  {/* Driver Note */}
                  {deliveryType === 'delivery' && (
                    <div className="flex flex-col gap-2">
                       <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                         {t(lang, 'driverNote')}
                       </label>
                       <textarea 
                         className="w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3 text-sm resize-none focus:outline-none focus:border-green-500 transition-colors"
                         rows={2}
                         placeholder={t(lang, 'driverNotePlaceholder')}
                         value={driverNote}
                         onChange={(e) => setDriverNote(e.target.value)}
                       />
                    </div>
                  )}

                  {/* Partial Payment UI */}
                  {userBalance > 0 && (
                    <div className="p-4 rounded-3xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 flex items-start gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full text-green-600 dark:text-green-300">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-green-900 dark:text-green-100">
                           {t(lang, 'payWithBalance')}
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-400 mt-1 mb-2">
                           {t(lang, 'balance')}: ₾{userBalance.toFixed(2)}
                        </p>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={useBalance} 
                            onChange={(e) => setUseBalance(e.target.checked)}
                            className="w-4 h-4 rounded text-green-600 focus:ring-green-500 bg-[var(--card)] border-[var(--border)]"
                          />
                          <span className="text-sm font-medium text-[var(--text)]">Use up to ₾{maxBalanceToUse.toFixed(2)}</span>
                        </label>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[var(--border)] bg-[var(--card)]">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>₾{subtotal.toFixed(2)}</span>
                  </div>
                  {deliveryType === 'delivery' && (
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Delivery Cost</span>
                      <span>₾{deliveryCost.toFixed(2)}</span>
                    </div>
                  )}
                  {useBalance && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Paid from balance</span>
                      <span>-₾{maxBalanceToUse.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-[var(--border)]">
                    <span>Total to pay via Bank</span>
                    <span>₾{finalToPay.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold tracking-wide shadow-lg shadow-green-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0">
                  {t(lang, 'checkout')}
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-3 flex items-center justify-center gap-1">
                  <Info className="w-3 h-3" /> Manual Bank transfer only
                </p>
              </div>
            )}
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
