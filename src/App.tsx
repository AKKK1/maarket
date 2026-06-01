/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider } from './store/AppContext';
import { Header } from './components/Header';
import { Home } from './views/Home';
import { CartDrawer } from './components/CartDrawer';
import { ProfileDrawer } from './components/ProfileDrawer';
import { CookieAndPromoModal } from './components/CookieModal';

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans antialiased selection:bg-green-200 dark:selection:bg-green-900">
      <Header 
        onOpenCart={() => setCartOpen(true)} 
        onOpenProfile={() => setProfileOpen(true)} 
      />
      <Home />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <ProfileDrawer isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      <CookieAndPromoModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
