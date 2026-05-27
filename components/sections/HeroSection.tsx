'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="hero-banner">
      {/* Video background */}
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        <source src="/videos/hero-video.webm" type="video/webm" />
        {/* CSS gradient fallback if video fails */}
      </video>

      {/* Fallback gradient — sits BEHIND video (z:-1) so video plays over it */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: -1,
          background: 'linear-gradient(135deg, #412D24 0%, #241D19 50%, #1a0f0c 100%)'
        }}
      />

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="relative z-10 w-full pb-20 md:pb-32">
        <div className="container-default">
          <div className="max-w-3xl">
            {/* H1 — load animation (initial/animate NOT whileInView) */}
            <motion.h1
              className="mb-10 text-[#FDF2CC]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Where Every Morning Begins With You.
            </motion.h1>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/menu" className="btn-primary inline-flex">
                <span className="btn-text-wrap">
                  <span className="btn-text-default">View All Products</span>
                  <span className="btn-text-hover">View All Products</span>
                </span>
                <span className="btn-circle">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Vertical decorative text — right side */}
      <motion.div
        className="absolute right-8 bottom-1/3 z-10 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="text-[#FDF2CC]/40 text-xs tracking-[0.5em] uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Artisan Bakery Since 2005
        </p>
      </motion.div>
    </section>
  );
}
