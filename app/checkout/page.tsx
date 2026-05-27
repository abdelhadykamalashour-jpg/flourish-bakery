'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cartContext';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.14;
  const total = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    clearCart();
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: 100 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-lg mx-auto px-6"
        >
          <div className="text-6xl mb-6">🥐</div>
          <h2 className="text-[#241D19] mb-4">Order Confirmed!</h2>
          <p className="text-[#524F45] text-lg leading-relaxed mb-8">
            Thank you for your order. We&apos;ve received your request and our bakers
            are already at work. Expect your fresh delivery within the hour.
          </p>
          <p className="text-[#524F45] text-sm mb-8">
            A confirmation email has been sent to your inbox.
          </p>
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
    );
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: 100, paddingBottom: 60 }}>
      <div className="container-md">
        {/* Header */}
        <div className="mb-10">
          <Link href="/menu" className="text-sm text-[#524F45] hover:text-[#C66C3C] transition-colors">
            ← Continue Shopping
          </Link>
          <h2 className="text-[#241D19] mt-4">Secure Checkout</h2>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-10">
          {['Customer Details', 'Payment'].map((label, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="flex items-center gap-2"
                style={{ opacity: step === 'details' && i === 1 ? 0.4 : 1 }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{
                    backgroundColor:
                      (i === 0 && step === 'details') || (i === 1 && step === 'payment')
                        ? '#241D19' : '#F0DFB1',
                    color:
                      (i === 0 && step === 'details') || (i === 1 && step === 'payment')
                        ? '#FDF2CC' : '#524F45',
                  }}
                >
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-[#241D19]">{label}</span>
              </div>
              {i === 0 && <span className="text-[#CDBE8B]">→</span>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {step === 'details' && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={(e) => { e.preventDefault(); setStep('payment'); }}
              >
                <h3 className="text-[#241D19] mb-6" style={{ fontSize: 24 }}>Delivery Details</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#241D19] mb-1.5">First Name *</label>
                      <input required name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Jane" className="form-field w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#241D19] mb-1.5">Last Name *</label>
                      <input required name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Smith" className="form-field w-full" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#241D19] mb-1.5">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@example.com" className="form-field w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#241D19] mb-1.5">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="01xxxxxxxxx" className="form-field w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#241D19] mb-1.5">Street Address *</label>
                    <input required name="address" value={formData.address} onChange={handleChange} placeholder="Villa 12, Street 5, Sodic East" className="form-field w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#241D19] mb-1.5">City</label>
                      <input name="city" value={formData.city} onChange={handleChange} placeholder="Cairo" className="form-field w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#241D19] mb-1.5">ZIP Code</label>
                      <input name="zip" value={formData.zip} onChange={handleChange} placeholder="11835" className="form-field w-full" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn-primary mt-8">
                  <span className="btn-text-wrap">
                    <span className="btn-text-default">Continue to Payment</span>
                    <span className="btn-text-hover">Continue to Payment</span>
                  </span>
                  <span className="btn-circle">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </motion.form>
            )}

            {step === 'payment' && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handlePlaceOrder}
              >
                <h3 className="text-[#241D19] mb-6" style={{ fontSize: 24 }}>Payment Details</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#241D19] mb-1.5">Card Number *</label>
                    <input required name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242" className="form-field w-full" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#241D19] mb-1.5">Expiry Date *</label>
                      <input required name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM / YY" className="form-field w-full" maxLength={7} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#241D19] mb-1.5">CVV *</label>
                      <input required name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" className="form-field w-full" maxLength={4} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#524F45]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="4" width="12" height="9" rx="1.5" stroke="#CDBE8B" strokeWidth="1.2" />
                      <path d="M4 4V3.5C4 2.12 5.12 1 6.5 1H7.5C8.88 1 10 2.12 10 3.5V4" stroke="#CDBE8B" strokeWidth="1.2" />
                    </svg>
                    Your payment is secured with 256-bit encryption
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="px-6 py-3 rounded-full text-sm font-medium text-[#524F45] hover:text-[#241D19] transition-colors"
                    style={{ border: '1.5px solid #CDBE8B' }}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn-primary">
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
                </div>
              </motion.form>
            )}
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
      </div>
    </div>
  );
}
