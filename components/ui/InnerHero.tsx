'use client';

import { motion } from 'framer-motion';

interface InnerHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function InnerHero({ eyebrow, title, subtitle, backgroundImage }: InnerHeroProps) {
  return (
    <section
      className="inner-hero"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="inner-hero-overlay" />
      <div className="container-default relative z-10 py-20">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#CDBE8B] text-xs font-medium tracking-[0.2em] uppercase mb-4"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#FDF2CC]"
          style={{ fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 700, lineHeight: 1.2 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#F0DFB1]/80 text-lg mt-4 max-w-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
