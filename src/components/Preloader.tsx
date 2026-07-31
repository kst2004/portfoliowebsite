'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Logo from './Logo';

export default function Preloader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (!sessionStorage.getItem('sk-preloader')) {
      sessionStorage.setItem('sk-preloader', '1');
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 2400);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Monogram */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.2, 1, 0.2, 1] }}
            >
              <Logo className="h-24 w-auto text-white sm:h-32" />
            </motion.div>

            {/* White underline */}
            <motion.div
              className="absolute -bottom-4 left-0 h-[2px] rounded-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.55, delay: 0.38, ease: 'easeOut' }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-5 text-[10px] uppercase tracking-[0.4em] text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Freelance Designer & 3D Visualizer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
