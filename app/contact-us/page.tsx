'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InnerHero } from '@/components/ui/InnerHero';
import { ScrollReveal, ScrollRevealHeading } from '@/components/ui/ScrollReveal';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <>
      <InnerHero
        eyebrow="Get In Touch"
        title="We'd Love To Hear From You"
        subtitle="Custom orders, wholesale inquiries, or just saying hello — we're here."
        backgroundImage="/images/hero/contact-hero.avif"
      />

      <section className="section-gap">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Locations */}
            <div className="lg:col-span-2 space-y-10">
              <ScrollReveal>
                <p className="text-[#C66C3C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  Find Us
                </p>
                <h2 className="text-[#241D19]" style={{ fontSize: 'clamp(32px, 3vw, 48px)' }}>
                  Find Us in Cairo
                </h2>
              </ScrollReveal>

              {/* Social Media */}
              <ScrollReveal delay={0.05}>
                <div className="flex items-center gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[#C66C3C]" style={{ backgroundColor: '#F0DFB1' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#241D19" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[#C66C3C]" style={{ backgroundColor: '#F0DFB1' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#241D19" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[#C66C3C]" style={{ backgroundColor: '#F0DFB1' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#241D19" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                  <a href="mailto:hello@flourish-bakery.com" aria-label="Email us" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[#C66C3C]" style={{ backgroundColor: '#F0DFB1' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#241D19" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  </a>
                </div>
              </ScrollReveal>

              {[
                {
                  name: 'Sodic East — Cairo',
                  address: 'Sodic East Compound, New Cairo, Cairo, Egypt',
                  phone: '01004852787',
                  hours: 'Mon–Fri 7 AM – 8 PM\nSat–Sun 8 AM – 6 PM',
                },
                {
                  name: 'Sheikh Zayed — Giza',
                  address: 'Arkan Mall, Sheikh Zayed City, Giza, Egypt',
                  phone: '01004852788',
                  hours: 'Mon–Fri 7 AM – 8 PM\nSat–Sun 8 AM – 6 PM',
                },
              ].map((loc, i) => (
                <ScrollReveal key={i} delay={0.1 * i}>
                  <div
                    className="p-6 rounded-2xl"
                    style={{ backgroundColor: '#F0DFB1' }}
                  >
                    <p className="font-serif font-semibold text-[#241D19] text-xl mb-4">{loc.name}</p>
                    <div className="space-y-3 text-[#524F45] text-sm">
                      <div className="flex items-start gap-3">
                        <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6C3.5 9.75 8 14.5 8 14.5C8 14.5 12.5 9.75 12.5 6C12.5 3.51 10.49 1.5 8 1.5ZM8 7.5C7.17 7.5 6.5 6.83 6.5 6C6.5 5.17 7.17 4.5 8 4.5C8.83 4.5 9.5 5.17 9.5 6C9.5 6.83 8.83 7.5 8 7.5Z" fill="#CDBE8B" />
                        </svg>
                        <span>{loc.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 2.5C3 2.5 4.5 2 5.5 3.5L6.5 5.5C6.5 5.5 5.5 6.5 6 7.5C6.5 8.5 8 10.5 9.5 11C10 11 11 10 11 10L13 11C14.5 12 14 13.5 14 13.5C13.5 14.5 11 15 9.5 14C8 13 3.5 8.5 2.5 6.5C1.5 4.5 2 2.5 3 2.5Z" fill="#CDBE8B" />
                        </svg>
                        <span>{loc.phone}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6.5" stroke="#CDBE8B" strokeWidth="1.3" />
                          <path d="M8 4.5V8.5L10.5 10" stroke="#CDBE8B" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                        <span style={{ whiteSpace: 'pre-line' }}>{loc.hours}</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <p className="text-[#C66C3C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  Send A Message
                </p>
                <h2 className="text-[#241D19] mb-8" style={{ fontSize: 'clamp(32px, 3vw, 48px)' }}>
                  Start A Conversation
                </h2>
              </ScrollReveal>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 rounded-2xl text-center"
                  style={{ backgroundColor: '#F0DFB1' }}
                >
                  <p className="text-4xl mb-4">🥐</p>
                  <p className="font-serif font-semibold text-[#241D19] text-xl mb-2">
                    Message Received!
                  </p>
                  <p className="text-[#524F45]">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <ScrollReveal delay={0.1}>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#241D19] text-sm font-medium mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className="form-field w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-[#241D19] text-sm font-medium mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="form-field w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#241D19] text-sm font-medium mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="+1 (212) 555-0100"
                          className="form-field w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-[#241D19] text-sm font-medium mb-1.5">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          className="form-field w-full"
                          style={{ appearance: 'none' }}
                        >
                          <option value="">Select a subject</option>
                          <option value="custom-order">Custom / Bulk Order</option>
                          <option value="wholesale">Wholesale Inquiry</option>
                          <option value="events">Events & Catering</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#241D19] text-sm font-medium mb-1.5">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us how we can help..."
                        className="form-field w-full resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary"
                    >
                      <span className="btn-text-wrap">
                        <span className="btn-text-default">
                          {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </span>
                        <span className="btn-text-hover">
                          {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </span>
                      </span>
                      <span className="btn-circle">
                        {status === 'loading' ? (
                          <svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="18 6" />
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </form>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
