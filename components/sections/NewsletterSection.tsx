'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simulate submission
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section className="section-gap">
      <div className="container-default">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[#524F45] text-lg leading-relaxed mb-8">
              Never miss a sweet deal! Be the first to know about our new flavors, seasonal specials, exclusive discounts, and bakery events.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4 px-6 bg-[#F0DFB1] rounded-2xl"
              >
                <p className="text-[#241D19] font-serif">
                  Thank you for subscribing! Sweet news is on its way. 🥐
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-label="Email address for newsletter"
                  className="form-field flex-1"
                />
                <button type="submit" className="btn-primary flex-shrink-0">
                  <span className="btn-text-wrap">
                    <span className="btn-text-default">Subscribe Now</span>
                    <span className="btn-text-hover">Subscribe Now</span>
                  </span>
                  <span className="btn-circle">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
