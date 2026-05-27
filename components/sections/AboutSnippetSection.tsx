'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const lines = [
  'Where every bite tells a story of',
  'warmth, love, and tradition. Freshly',
  'baked each morning',
];

export function AboutSnippetSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);

  return (
    <section ref={ref} className="section-gap overflow-hidden">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text reveal block */}
          <div className="space-y-3">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="font-serif text-[clamp(24px,3vw,48px)] font-semibold leading-tight"
                  style={{ color: '#241D19' }}
                >
                  {line}
                </p>
              </motion.div>
            ))}

            {/* Video embed — full-width below text block */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 pt-6"
            >
              {/* Video thumbnail — full column width */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ scale: videoScale }}
                >
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/about-video-poster.jpg"
                  >
                    <source src="/videos/about-video.mp4" type="video/mp4" />
                    <source src="/videos/about-video.webm" type="video/webm" />
                  </video>
                  <div className="absolute inset-0 bg-[#241D19]/30 z-10" />
                </motion.div>
                {/* Play indicator */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-12 h-12 rounded-full bg-[#FDF2CC]/90 flex items-center justify-center">
                    <svg width="14" height="16" viewBox="0 0 10 12" fill="none">
                      <path d="M1 1L9 6L1 11V1Z" fill="#241D19"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-[#524F45] text-sm leading-relaxed">
                with handpicked, wholesome ingredients. From sourdough to sweet treats — taste the artisan difference.
              </p>
            </motion.div>
          </div>

          {/* Stats column */}
          <div className="grid grid-cols-2 gap-8">
            {[
              { value: '20+', label: 'Years of Baking' },
              { value: '50+', label: 'Menu Items' },
              { value: '10k+', label: 'Happy Customers' },
              { value: '2', label: 'Cairo Locations' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="font-serif text-5xl font-bold text-[#C66C3C] mb-2">{stat.value}</p>
                <p className="text-[#524F45] text-sm tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
