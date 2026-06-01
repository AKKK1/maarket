import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ads = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1498837167922-41ccf36f0ae1?w=1200&q=80',
    title: 'Farm Fresh Selection',
    subtitle: 'From out fields to your table.',
    link: '#'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
    title: 'UBANI.website',
    subtitle: 'Discover local communities.',
    link: 'https://ubani.website'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506485338023-6ce5f36692df?w=1200&q=80',
    title: 'Gamitsvale.GE',
    subtitle: 'Everything exchange platform.',
    link: 'https://gamitsvale.ge'
  }
];

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-[32px] overflow-hidden bg-[#111] shadow-2xl group">
        
        {/* Persistent dark gradient overlay */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900 to-black z-10 pointer-events-none" />

        <AnimatePresence initial={false}>
          {ads.map((ad, idx) => (
            idx === current && (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img 
                  src={ad.image} 
                  alt={ad.title} 
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
                
                {/* Content matched to Clean Minimalism style */}
                <div className="absolute inset-0 flex items-center justify-between p-8 sm:px-12 z-20 w-full">
                  <div className="max-w-md mt-auto sm:mt-0">
                    <div className="inline-block px-3 py-1.5 bg-[var(--color-primary-500)] text-white text-[10px] font-bold tracking-widest uppercase mb-3 rounded-md shadow-lg">
                      Featured
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-2">
                      {ad.title}
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm mt-1 mb-6">
                      {ad.subtitle}
                    </p>
                    <a 
                      href={ad.link}
                      className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Indicators */}
        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          {ads.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                current === idx ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
