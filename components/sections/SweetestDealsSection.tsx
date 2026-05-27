'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollRevealHeading, ScrollReveal } from '@/components/ui/ScrollReveal';
import { StarRating } from '@/components/ui/StarRating';
import { useCart } from '@/lib/cartContext';
import { products } from '@/lib/data';

// Featured deals — first 5 products with discounts
const featuredProducts = products.filter(p => p.badge).slice(0, 5);

export function SweetestDealsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section style={{ backgroundColor: '#F0DFB1' }} className="section-gap overflow-hidden">
      <div className="container-default">
        {/* Heading */}
        <ScrollRevealHeading className="mb-12">
          <h2>Featured Selections of the Week</h2>
        </ScrollRevealHeading>

        {/* Slider */}
        <ScrollReveal delay={0.1}>
          <div className="relative">
            {/* Slides */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {featuredProducts.map(product => (
                  <div key={product.id} className="min-w-full px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Image */}
                      <Link href={`/product/${product.slug}`} className="relative overflow-hidden rounded-2xl aspect-[4/3] block">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {product.badge && (
                          <div className="absolute top-4 left-4 bg-[#C66C3C] text-[#FDF2CC] text-xs font-semibold px-3 py-1.5 rounded-full">
                            {product.badge}
                          </div>
                        )}
                      </Link>

                      {/* Content */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <span className="text-[#6B4C3B] text-xs font-medium tracking-widest uppercase">{product.categoryLabel}</span>
                        </div>

                        <Link href={`/product/${product.slug}`}>
                          <h3 className="text-[#241D19] hover:text-[#C66C3C] transition-colors duration-200">
                            {product.name}
                          </h3>
                        </Link>

                        <StarRating rating={product.rating} size={16} />

                        <p className="text-[#524F45] leading-relaxed">{product.description}</p>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-serif font-semibold text-[#C66C3C]">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-[#6B4C3B] line-through text-lg">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="btn-primary"
                          >
                            <span className="btn-text-wrap">
                              <span className="btn-text-default">
                                {addedId === product.id ? 'Added!' : 'Add to Cart'}
                              </span>
                              <span className="btn-text-hover">
                                {addedId === product.id ? 'Added!' : 'Add to Cart'}
                              </span>
                            </span>
                            <span className="btn-circle">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </button>
                          <Link href={`/product/${product.slug}`} className="btn-orange">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
                disabled={activeSlide === 0}
                className="w-12 h-12 rounded-full border-2 border-[#CDBE8B] flex items-center justify-center text-[#524F45] hover:border-[#C66C3C] hover:text-[#C66C3C] disabled:opacity-30 transition-all duration-200"
                aria-label="Previous slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {featuredProducts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className="p-2 flex items-center justify-center"
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <span className={`rounded-full transition-all duration-300 block ${
                      i === activeSlide
                        ? 'w-6 h-2 bg-[#C66C3C]'
                        : 'w-2 h-2 bg-[#CDBE8B]'
                    }`} />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setActiveSlide(prev => Math.min(featuredProducts.length - 1, prev + 1))}
                disabled={activeSlide === featuredProducts.length - 1}
                className="w-12 h-12 rounded-full border-2 border-[#CDBE8B] flex items-center justify-center text-[#524F45] hover:border-[#C66C3C] hover:text-[#C66C3C] disabled:opacity-30 transition-all duration-200"
                aria-label="Next slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
