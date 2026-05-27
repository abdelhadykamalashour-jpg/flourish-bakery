'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const instagramImages = [
  { src: '/images/instagram/ig-01.avif', alt: 'Bakery instagram photo 1' },
  { src: '/images/instagram/ig-02.avif', alt: 'Bakery instagram photo 2' },
  { src: '/images/instagram/ig-03.avif', alt: 'Bakery instagram photo 3' },
  { src: '/images/instagram/ig-04.avif', alt: 'Bakery instagram photo 4' },
  { src: '/images/instagram/ig-05.avif', alt: 'Bakery instagram photo 5' },
  { src: '/images/instagram/ig-06.avif', alt: 'Bakery instagram photo 6' },
];

// Duplicate for seamless loop
const allImages = [...instagramImages, ...instagramImages];

export function InstagramSection() {
  return (
    <section className="section-gap overflow-hidden">
      <div>
        {/* Handle */}
        <div className="container-default mb-10">
          <motion.a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            <h2 className="text-[#241D19] hover:text-[#C66C3C] transition-colors duration-200">
              @flourish.bakery
            </h2>
          </motion.a>
        </div>

        {/* Scrolling track — marquee */}
        <div className="instagram-track">
          {allImages.map((img, i) => (
            <a
              key={i}
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-shrink-0 overflow-hidden group"
              style={{ width: 'clamp(200px, 22vw, 320px)', aspectRatio: '1' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="320px"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#C66C3C]/0 group-hover:bg-[#C66C3C]/20 transition-all duration-300 flex items-center justify-center">
                <svg
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  width="32" height="32" viewBox="0 0 24 24" fill="none"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
