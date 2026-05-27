'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  skew?: boolean;
}

export function ScrollReveal({ children, delay = 0, className = '', skew = false }: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 50,
        skewX: skew ? 5 : 0,
        skewY: skew ? 5 : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        skewX: 0,
        skewY: 0,
      }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealHeading({ children, delay = 0, className = '' }: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50, skewX: 5, skewY: 5 }}
      whileInView={{ opacity: 1, y: 0, skewX: 0, skewY: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
