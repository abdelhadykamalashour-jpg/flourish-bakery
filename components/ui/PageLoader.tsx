'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key={pathname}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="page-loader"
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* SVG Croissant Line-Draw */}
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Outer curved arc — croissant body left wing */}
              <motion.path
                d="M14 52 C6 42, 8 24, 20 16 C26 12, 34 10, 40 14"
                stroke="#C66C3C"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0 }}
              />
              {/* Croissant body center curve */}
              <motion.path
                d="M40 14 C50 18, 56 28, 52 40 C48 50, 38 56, 28 54 C20 52, 14 52, 14 52"
                stroke="#C66C3C"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
              />
              {/* Right tip */}
              <motion.path
                d="M52 40 C56 46, 62 50, 58 58 C55 63, 48 62, 44 58"
                stroke="#CDBE8B"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
              />
              {/* Left tip */}
              <motion.path
                d="M20 16 C14 12, 10 6, 16 2 C20 -1, 26 2, 28 8"
                stroke="#CDBE8B"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.55 }}
              />
              {/* Inner layer 1 — lamination suggestion */}
              <motion.path
                d="M22 46 C18 38, 20 26, 28 20"
                stroke="#F0DFB1"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.7 }}
              />
              {/* Inner layer 2 */}
              <motion.path
                d="M32 50 C26 44, 26 34, 32 28"
                stroke="#F0DFB1"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.82 }}
              />
            </svg>

            {/* Brand wordmark */}
            <motion.div
              className="flex flex-col items-center gap-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <p
                className="text-[#412D24] tracking-[0.28em] uppercase font-semibold"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 15, letterSpacing: '0.28em' }}
              >
                FLOURISH
              </p>
              <p
                className="text-[#CDBE8B] tracking-[0.42em] uppercase"
                style={{ fontFamily: 'Lora, Georgia, serif', fontSize: 8, letterSpacing: '0.42em' }}
              >
                Bakery
              </p>
            </motion.div>

            {/* Subtle progress line */}
            <motion.div
              className="h-px rounded-full"
              style={{ backgroundColor: '#CDBE8B', width: 40 }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
