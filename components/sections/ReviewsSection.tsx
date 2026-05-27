'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollRevealHeading } from '@/components/ui/ScrollReveal';
import { StarRating } from '@/components/ui/StarRating';
import { reviews } from '@/lib/data';

export function ReviewsSection() {
  const [activeReview, setActiveReview] = useState(0);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview(prev => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ backgroundColor: '#F0DFB1' }} className="section-gap overflow-hidden">
      <div className="container-default">
        {/* Heading */}
        <ScrollRevealHeading className="mb-12">
          <h2>Moments That Speak for Themselves</h2>
        </ScrollRevealHeading>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Show 3 reviews at a time (cycling) */}
              {[0, 1, 2].map(offset => {
                const review = reviews[(activeReview + offset) % reviews.length];
                return (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                    style={{ boxShadow: '0 4px 24px rgba(36,29,25,0.06)' }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-[#F0DFB1] flex-shrink-0">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-[#241D19] text-base">{review.name}</p>
                        <p className="text-[#412D24] text-xs mt-0.5">{review.location}</p>
                      </div>
                    </div>

                    <StarRating rating={review.rating} size={14} showValue={false} className="mb-3" />

                    <p className="text-[#412D24] text-sm leading-relaxed italic">{review.quote}</p>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveReview(i)}
              className="p-2 flex items-center justify-center"
              aria-label={`Review ${i + 1}`}
            >
              <span className={`rounded-full transition-all duration-300 block ${
                i === activeReview
                  ? 'w-6 h-2 bg-[#C66C3C]'
                  : 'w-2 h-2 bg-[#CDBE8B]'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
