'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export default function Reveal({ children, className, delay = 0, y = 30 }: RevealProps) {
  // Reduced motion is handled globally by MotionProvider — branching on it here
  // would desync the server and client renders. See MotionProvider for why.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, delay, ease: [0.2, 1, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
