'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cartContext';

// ── WhatsApp message builder ──────────────────────────────────────────────────
function buildWhatsAppUrl(
  formData: { fullName: string; phone: string; address: string },
  items: Array<{ name: string; quantity: number; price: number }>,
  total: number
): string {
  const orderLines = items
    .map(item => `${item.quantity}x ${item.name} - ${(item.price * item.quantity).toFixed(0)} EGP`)
    .join('\n');

  const message =
    `🥐 *New Order - Flourish Bakery*\n` +
    `*Name:* ${formData.fullName}\n` +
    `*Phone:* ${formData.phone}\n` +
    `*Address:* ${formData.address}, Sodic East\n\n` +
    `*Order:*\n` +
    `${orderLines}\n\n` +
    `*Total:* ${total.toFixed(0)} EGP\n\n` +
    `Please confirm my order!`;

  return `https://wa.me/201004852787?text=${encodeURIComponent(message)}`;
}

// ── Animated wheat stalk SVG ──────────────────────────────────────────────────
function WheatSVG() {
  const stemEase = [0.22, 1, 0.36, 1] as const;
  const huskEase = [0.4, 0, 0.2, 1] as const;

  const husks = [
    { d: 'M 40 95 Q 16 88 20 76', delay: 0.35 },
    { d: 'M 40 95 Q 64 88 60 76', delay: 0.45 },
    { d: 'M 40 78 Q 14 70 18 58', delay: 0.65 },
    { d: 'M 40 78 Q 66 70 62 58', delay: 0.75 },
    { d: 'M 40 61 Q 15 53 19 41', delay: 0.95 },
    { d: 'M 40 61 Q 65 53 61 41', delay: 1.05 },
    { d: 'M 40 44 Q 20 36 24 26', delay: 1.25 },
    { d: 'M 40 44 Q 60 36 56 26', delay: 1.35 },
  ];

  return (
    <svg
      width="72"
      height="116"
      viewBox="0 0 80 120"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Main stem */}
      <motion.path
        d="M 40 112 L 40 8"
        stroke="#C4A97E"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: stemEase }}
      />
      {/* Grain husks */}
      {husks.map(({ d, delay }, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#C4A97E"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay, ease: huskEase }}
        />
      ))}
    </svg>
  );
}

// ── Checkout page ─────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [formData, setFormData] = useState({ fullName: '', phone: '', address: '' });

  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.14;
  const total = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(formData, items, total);
    setWhatsappUrl(url);
    setSubmitted(true);
  };

  // 1.5s after Merci screen appears → open WhatsApp, then clear cart
  useEffect(() => {
    if (!submitted || !whatsappUrl) return;
    const timer = setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      clearCart();
    }, 1500);
    return () => clearTimeout(timer);
  }, [submitted, whatsappUrl, clearCart]);

  return (
    <div className="min-h-screen" style={{ paddingTop: 100, paddingBottom: 60 }}>
      <AnimatePresence mode="wait">

        {/* ── Cinematic Merci screen ─────────────────────────────────── */}
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center min-h-[72vh]"
          >
            <div className="text-center max-w-lg mx-auto px-6">

              {/* Slow-drawing wheat SVG */}
              <div className="flex justify-center mb-8">
                <WheatSVG />
              </div>

              {/* "Merci." heading — premium French serif */}
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(64px, 12vw, 104px)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: '#241D19',
                }}
              >
                Merci.
              </motion.h2>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#524F45] leading-relaxed mt-5 mb-10"
                style={{ fontSize: '1.0625rem' }}
              >
                Your order is being sent to our concierge via WhatsApp
                to coordinate your fresh delivery.
              </motion.p>

              {/* Back to home */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.5 }}
              >
                <Link href="/" className="btn-primary inline-flex">
                  <span className="btn-text-wrap">
                    <span className="btn-text-default">Back to Home</span>
                    <span className="btn-text-hover">Back to Home</span>
                  </span>
                  <span className="btn-circle">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

        ) : (

          /* ── Checkout form ─────────────────────────────────────────── */
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="container-md"
          >
            {/* Header */}
            <div className="mb-10">
              <Link href="/menu" className="text-sm text-[#524F45] hover:text-[#C66C3C] transition-colors">
                ← Continue Shopping
              </Link>
              <h2 className="text-[#241D19] mt-4">Checkout</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* Form */}
              <div className="lg:col-span-3">
                <motion.form
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handlePlaceOrder}
                >
                  <h3 className="text-[#241D19] mb-6" style={{ fontSize: 24 }}>Delivery Details</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#241D19] mb-1.5">Full Name *</label>
                      <input
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="form-field w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#241D19] mb-1.5">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01xxxxxxxxx"
                        className="form-field w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#241D19] mb-1.5">Delivery Address *</label>
                      <input
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Villa 12, Street 5, Sodic East Compound"
                        className="form-field w-full"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary mt-8">
                    <span className="btn-text-wrap">
                      <span className="btn-text-default">Place Order · EGP {total.toFixed(0)}</span>
                      <span className="btn-text-hover">Place Order · EGP {total.toFixed(0)}</span>
                    </span>
                    <span className="btn-circle">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </motion.form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-2">
                <div className="sticky top-28 rounded-2xl p-6" style={{ backgroundColor: '#F0DFB1' }}>
                  <h4 className="text-[#241D19] mb-6" style={{ fontSize: 20 }}>Order Summary</h4>

                  {items.length === 0 ? (
                    <p className="text-[#524F45] text-sm text-center py-8">Your cart is empty.</p>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {items.map(item => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[#241D19] text-sm font-medium truncate">{item.name}</p>
                              <p className="text-[#524F45] text-xs">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-[#241D19] text-sm font-semibold flex-shrink-0">
                              EGP {(item.price * item.quantity).toFixed(0)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 pt-4" style={{ borderTop: '1px solid #CDBE8B' }}>
                        <div className="flex justify-between text-sm text-[#524F45]">
                          <span>Subtotal</span>
                          <span>EGP {subtotal.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-[#524F45]">
                          <span>Shipping</span>
                          <span>{shipping === 0 ? 'Free' : `EGP ${shipping.toFixed(0)}`}</span>
                        </div>
                        <div className="flex justify-between text-sm text-[#524F45]">
                          <span>VAT (14%)</span>
                          <span>EGP {tax.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-[#241D19] pt-2" style={{ borderTop: '1px solid #CDBE8B' }}>
                          <span>Total</span>
                          <span>EGP {total.toFixed(0)}</span>
                        </div>
                      </div>

                      {subtotal < 500 && (
                        <p className="text-xs text-[#C66C3C] mt-3 text-center">
                          Add EGP {(500 - subtotal).toFixed(0)} more for free delivery!
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
