'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cartContext';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="cart-overlay"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="cart-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#F0DFB1]">
              <div>
                <h3 className="text-lg font-serif font-semibold text-[#241D19]">Your Cart</h3>
                {totalItems > 0 && (
                  <p className="text-sm text-[#524F45] mt-0.5">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-[#524F45] hover:text-[#241D19] transition-colors"
                aria-label="Close cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  {/* Empty cart illustration */}
                  <div className="w-20 h-20 rounded-full bg-[#F0DFB1] flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 30 30" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.77734 6.77734C9.77734 4.01977 12.0173 1.77979 14.7749 1.77979C17.5324 1.77979 19.7724 4.01977 19.7724 6.77734V8.22266H9.77734V6.77734ZM7.89734 8.22266V6.77734C7.89734 2.97977 10.9773 -0.100098 14.7749 -0.100098C18.5724 -0.100098 21.6524 2.97977 21.6524 6.77734V8.22266H25.7499C26.2699 8.22266 26.6899 8.64266 26.6899 9.16266V24.5401C26.6899 26.5576 25.0474 28.2001 23.0299 28.2001H6.51988C4.50238 28.2001 2.85986 26.5576 2.85986 24.5401V9.16266C2.85986 8.64266 3.27986 8.22266 3.79986 8.22266H7.89734Z" fill="#CDBE8B"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-serif text-xl text-[#241D19] mb-2">Your cart is empty</p>
                    <p className="text-[#524F45] text-sm">Add some freshly baked goodness to get started.</p>
                  </div>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="btn-orange mt-2 text-sm"
                  >
                    <span>Browse Menu</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-3 pb-4 border-b border-[#F0DFB1] last:border-0"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#F0DFB1]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm font-semibold text-[#241D19] truncate">{item.name}</p>
                          <p className="text-[#C66C3C] text-sm font-medium mt-0.5">EGP {item.price.toFixed(0)}</p>

                          {/* Qty stepper */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full border border-[#CDBE8B] text-[#524F45] flex items-center justify-center hover:border-[#C66C3C] hover:text-[#C66C3C] transition-colors text-sm"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="text-sm font-medium text-[#241D19] w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full border border-[#CDBE8B] text-[#524F45] flex items-center justify-center hover:border-[#C66C3C] hover:text-[#C66C3C] transition-colors text-sm"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#CDBE8B] hover:text-[#C66C3C] transition-colors self-start"
                          aria-label="Remove item"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#F0DFB1] space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#524F45]">Subtotal</span>
                  <span className="font-serif text-xl font-semibold text-[#241D19]">EGP {subtotal.toFixed(0)}</span>
                </div>
                <p className="text-xs text-[#524F45] opacity-70">Taxes and shipping calculated at checkout</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-orange w-full text-center justify-center"
                >
                  <span>Proceed to Checkout</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-[#524F45] hover:text-[#C66C3C] transition-colors underline underline-offset-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
