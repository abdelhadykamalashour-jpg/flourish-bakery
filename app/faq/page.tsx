'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InnerHero } from '@/components/ui/InnerHero';
import { ScrollReveal, ScrollRevealHeading } from '@/components/ui/ScrollReveal';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { faqItems } from '@/lib/data';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(prev => (prev === i ? null : i));
  };

  return (
    <>
      <InnerHero
        eyebrow="FAQ"
        title="Your Questions Answered"
        subtitle="Everything you need to know before your first visit — or your hundredth."
        backgroundImage="/images/hero/faq-hero.avif"
      />

      <section className="section-gap">
        <div className="container-md">
          <ScrollRevealHeading className="mb-12 text-center">
            <h2>Common Questions</h2>
          </ScrollRevealHeading>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <ScrollReveal key={i} delay={0.05 * i}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: '1.5px solid #e5d9c0',
                    backgroundColor: openIndex === i ? '#F0DFB1' : 'white',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-serif font-semibold text-[#241D19] text-lg">
                      {item.question}
                    </span>
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: openIndex === i ? '#241D19' : '#F0DFB1',
                        transform: openIndex === i ? 'rotate(45deg)' : 'none',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 3V11M3 7H11"
                          stroke={openIndex === i ? '#FDF2CC' : '#241D19'}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="px-6 pb-6 text-[#524F45] leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.2}>
            <div className="mt-16 text-center">
              <p className="text-[#524F45] mb-4">Didn&apos;t find what you were looking for?</p>
              <a href="/contact-us" className="btn-primary inline-flex">
                <span className="btn-text-wrap">
                  <span className="btn-text-default">Contact Us</span>
                  <span className="btn-text-hover">Contact Us</span>
                </span>
                <span className="btn-circle">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
