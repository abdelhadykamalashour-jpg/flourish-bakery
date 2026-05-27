'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InnerHero } from '@/components/ui/InnerHero';
import { ProductCard } from '@/components/ui/ProductCard';
import { ScrollRevealHeading, ScrollReveal } from '@/components/ui/ScrollReveal';
import { products, categories } from '@/lib/data';

// Featured deals — first 6 with originalPrice > price (on sale)
const featuredDeals = products.filter(p => p.originalPrice > p.price).slice(0, 6);

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A–Z' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const filtered = (() => {
    let items = activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory);
    if (sortBy === 'price-asc') items = [...items].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') items = [...items].sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    return items;
  })();

  return (
    <>
      <InnerHero
        eyebrow="Our Menu"
        title="Freshly Baked, Daily"
        subtitle="Every item crafted by hand with the finest seasonal ingredients."
        backgroundImage="/images/hero/menu-hero.avif"
      />

      {/* ── Sweetest Deals ── */}
      <section className="section-gap" style={{ backgroundColor: '#F0DFB1' }}>
        <div className="container-default">
          <ScrollReveal className="mb-10">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[#C66C3C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                  Limited Time
                </p>
                <h2 className="text-[#241D19]" style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}>
                  This Week&apos;s Picks
                </h2>
              </div>
              <button
                onClick={() => setActiveCategory('all')}
                className="hidden md:flex items-center gap-2 text-sm text-[#241D19] font-medium hover:text-[#C66C3C] transition-colors duration-200 tracking-wide"
              >
                View All
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {featuredDeals.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filter + Sort ── */}
      <section className="section-gap-sm">
        <div className="container-default">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 justify-between items-center">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'bg-[#241D19] text-[#FDF2CC]'
                        : 'bg-white text-[#524F45] hover:bg-[#F0DFB1] hover:text-[#241D19]'
                    }`}
                    style={{ border: '1.5px solid #e5d9c0' }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                aria-label="Sort products"
                className="px-4 py-2.5 rounded-full text-sm font-medium text-[#524F45] bg-white transition-all duration-200 hover:bg-[#F0DFB1] focus:outline-none"
                style={{ border: '1.5px solid #e5d9c0', appearance: 'none', paddingRight: 32, cursor: 'pointer' }}
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="pb-24">
        <div className="container-default">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#524F45] text-lg">No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
