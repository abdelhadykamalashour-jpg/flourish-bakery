'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollRevealHeading, ScrollReveal } from '@/components/ui/ScrollReveal';
import { ProductCard } from '@/components/ui/ProductCard';
import { products } from '@/lib/data';

// Show 4 featured products on homepage
const featuredProducts = products.slice(0, 4);

export function FreshFromOvenSection() {
  return (
    <section className="section-gap">
      <div className="container-default">
        <div className="flex items-end justify-between mb-12 gap-6">
          <ScrollRevealHeading>
            <h2>Straight From Our Ovens</h2>
          </ScrollRevealHeading>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <Link href="/menu" className="btn-primary">
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

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
