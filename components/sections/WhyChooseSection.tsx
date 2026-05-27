'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollRevealHeading, ScrollReveal } from '@/components/ui/ScrollReveal';

const features = [
  'Freshly baked every morning before 6 AM',
  'Locally sourced, organic ingredients',
  'Traditional recipes passed down with love',
  'Handmade with care — never mass produced',
  'Exceptional service and warm atmosphere',
];

export function WhyChooseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax: image starts blurred/scaled, unblurs as scrolled into view
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.3, 1.0]);
  const blurNum = useTransform(scrollYProgress, [0, 0.5], [6, 0]);
  const blurFilter = useTransform(blurNum, (b: number) => `blur(${b}px)`);

  return (
    <section ref={ref} className="section-gap overflow-hidden">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image — parallax */}
          <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ scale }}
            >
              <motion.div
                className="w-full h-full"
                style={{ filter: blurFilter }}
              >
                <Image
                  src="/images/why-choose-bakery.avif"
                  alt="Why Choose Flourish Bakery"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </motion.div>
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-[#241D19]/10" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <ScrollRevealHeading>
              <h2>The Flourish Difference</h2>
            </ScrollRevealHeading>

            <ScrollReveal delay={0.1}>
              <p className="text-[#524F45] leading-relaxed text-lg">
                At Flourish, quality meets passion. We bake fresh every day using locally sourced ingredients and time-tested recipes passed down with love. Each treat is handmade with care to deliver not just flavor — but joy. From our cozy atmosphere to our exceptional service, we&apos;re here to make your day a little sweeter.
              </p>
            </ScrollReveal>

            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C66C3C] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#FDF2CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[#524F45]">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
