'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollRevealHeading, ScrollReveal } from '@/components/ui/ScrollReveal';

const categories = [
  {
    id: 'baked-goods',
    label: 'Baked Goods',
    image: '/images/categories/baked-goods.avif',
  },
  {
    id: 'cakes-pastries',
    label: 'Cakes & Pastries',
    image: '/images/categories/cakes-pastries.avif',
  },
  {
    id: 'desserts-sweets',
    label: 'Desserts & Sweets',
    image: '/images/categories/desserts-sweets.avif',
  },
  {
    id: 'savory',
    label: 'Savory Items',
    image: '/images/categories/savory-items.avif',
  },
];

export function FlavorSection() {
  return (
    <section className="section-gap">
      <div className="container-default">
        {/* Heading */}
        <ScrollRevealHeading className="mb-12">
          <h2>Discover Our Signature Collection</h2>
        </ScrollRevealHeading>

        {/* Category Grid */}
        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/menu"
                  className="group block relative overflow-hidden rounded-2xl aspect-[4/5] bg-[#F0DFB1]"
                >
                  {/* Image */}
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241D19]/80 via-transparent to-transparent" />

                  {/* Label + arrow */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                    <span className="text-[#FDF2CC] font-serif text-lg md:text-xl font-semibold">
                      {cat.label}
                    </span>
                    {/* Arrow SVG — rotates on hover */}
                    <motion.div
                      className="text-[#FDF2CC]"
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: -45 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.89767 19.8594C5.5525 19.2615 5.75734 18.497 6.35521 18.1518L22.5932 8.77683C23.191 8.43165 23.9555 8.6365 24.3007 9.23436C24.6459 9.83223 24.441 10.5967 23.8432 10.9419L7.60521 20.3169C7.00734 20.6621 6.24285 20.4572 5.89767 19.8594Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M20.1084 21.3693C19.442 21.1893 19.0477 20.503 19.2277 19.8366L21.684 10.7449L12.5829 8.32726C11.9157 8.15002 11.5185 7.46546 11.6957 6.79824C11.873 6.13102 12.5575 5.73382 13.2248 5.91106L23.5391 8.65098C23.8604 8.73633 24.1344 8.94615 24.3007 9.23404C24.4669 9.52193 24.5116 9.86418 24.4249 10.1851L21.6412 20.4886C21.4611 21.1551 20.7748 21.5493 20.1084 21.3693Z" fill="currentColor"/>
                      </svg>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
