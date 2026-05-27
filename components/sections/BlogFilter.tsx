'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, ScrollRevealHeading } from '@/components/ui/ScrollReveal';
import { blogPosts } from '@/lib/data';

const allCategories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

export function BlogFilter() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [featured, ...rest] = blogPosts;

  const filteredRest = activeCategory === 'All'
    ? rest
    : rest.filter(p => p.category === activeCategory);

  const showFeatured = activeCategory === 'All' || activeCategory === featured.category;

  return (
    <>
      {/* Category Filter */}
      <section className="pt-16 pb-4">
        <div className="container-default">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 justify-center">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#241D19] text-[#FDF2CC]'
                      : 'bg-white text-[#524F45] hover:bg-[#F0DFB1] hover:text-[#241D19]'
                  }`}
                  style={{ border: '1.5px solid #e5d9c0' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Post */}
      <AnimatePresence mode="wait">
        {showFeatured && (
          <motion.section
            key="featured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="section-gap"
          >
            <div className="container-default">
              <ScrollReveal>
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="relative overflow-hidden rounded-2xl bg-[#F0DFB1]" style={{ aspectRatio: '4/3' }}>
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                    <div>
                      <p className="text-[#C66C3C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                        {featured.category}
                      </p>
                      <h2 className="text-[#241D19] group-hover:text-[#C66C3C] transition-colors duration-300">
                        {featured.title}
                      </h2>
                      <p className="text-[#524F45] text-lg leading-relaxed mt-4 mb-6">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-[#524F45]">
                        <span>{featured.date}</span>
                        <span>·</span>
                        <span>{featured.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Divider */}
      {showFeatured && (
        <div className="container-default">
          <hr style={{ borderColor: '#e5d9c0' }} />
        </div>
      )}

      {/* Post Grid */}
      <section className="section-gap">
        <div className="container-default">
          <ScrollRevealHeading className="mb-12">
            <h2>More From The Journal</h2>
          </ScrollRevealHeading>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredRest.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl bg-[#F0DFB1] mb-5" style={{ aspectRatio: '4/3' }}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <p className="text-[#C66C3C] text-xs font-semibold tracking-[0.15em] uppercase mb-2">
                      {post.category}
                    </p>
                    <h3 className="text-[#241D19] group-hover:text-[#C66C3C] transition-colors duration-300 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-[#524F45] text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#524F45]">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredRest.length === 0 && !showFeatured && (
            <div className="text-center py-20">
              <p className="text-[#524F45] text-lg">No posts in this category yet.</p>
            </div>
          )}

          {/* View All CTA */}
          <div className="mt-14 text-center">
            <button
              onClick={() => setActiveCategory('All')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '13px 32px',
                border: '1.5px solid #241D19',
                borderRadius: 100,
                color: '#241D19',
                backgroundColor: 'transparent',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#241D19';
                (e.currentTarget as HTMLButtonElement).style.color = '#FDF2CC';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = '#241D19';
              }}
            >
              View All Articles
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
