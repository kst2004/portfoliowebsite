'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

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
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#14181e]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Letters */}
          <div className="relative flex items-end gap-[0.06em]">
            {['S', 'K'].map((letter, i) => (
              <motion.span
                key={letter}
                className="font-heading text-[5.5rem] font-semibold leading-none tracking-tight text-accentSoft sm:text-[7rem]"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.14, ease: [0.2, 1, 0.2, 1] }}
              >
                {letter}
              </motion.span>
            ))}

            {/* Gold underline */}
            <motion.div
              className="absolute -bottom-2 left-0 h-[2px] rounded-full bg-accentGold"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.55, delay: 0.38, ease: 'easeOut' }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-5 text-[10px] uppercase tracking-[0.4em] text-accentSoft/30"
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
