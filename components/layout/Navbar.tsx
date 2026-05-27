'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about-us', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact-us', label: 'Contact Us' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? 'rgba(36, 29, 25, 0.95)'
            : 'rgba(36, 29, 25, 0.8)',
          backdropFilter: 'blur(12px)',
          height: '100px',
        }}
      >
        <div className="container-default h-full flex items-center justify-between">
          {/* Hamburger — Left */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col gap-1.5 p-2 group"
            aria-label="Open menu"
          >
            <span className="block w-6 h-[1.5px] bg-[#FDF2CC] transition-all duration-300 group-hover:w-5" />
            <span className="block w-6 h-[1.5px] bg-[#FDF2CC] transition-all duration-300" />
            <span className="block w-6 h-[1.5px] bg-[#FDF2CC] transition-all duration-300 group-hover:w-7" />
          </button>

          {/* Logo — Center */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0">
            <span
              className="text-[#FDF2CC] font-serif font-bold tracking-wider whitespace-nowrap"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, letterSpacing: '0.12em' }}
            >
              FLOURISH
            </span>
            <span
              className="text-[#CDBE8B] tracking-[0.35em] uppercase"
              style={{ fontFamily: 'Lora, serif', fontSize: 9, letterSpacing: '0.35em' }}
            >
              Bakery
            </span>
          </Link>

          {/* Icons — Right */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <Link href="/menu" className="hidden md:flex p-2 text-[#FDF2CC] hover:text-[#C66C3C] transition-colors duration-200" aria-label="Search">
              <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M14.6735 4.375C8.99476 4.375 4.37476 8.99375 4.37476 14.6725C4.37476 20.3512 8.99476 24.9712 14.6735 24.9712C20.351 24.9712 24.971 20.3512 24.971 14.6725C24.971 8.99375 20.351 4.375 14.6735 4.375ZM14.6735 26.8462C7.96101 26.8462 2.49976 21.385 2.49976 14.6725C2.49976 7.96 7.96101 2.5 14.6735 2.5C21.386 2.5 26.846 7.96 26.846 14.6725C26.846 21.385 21.386 26.8462 14.6735 26.8462Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M26.8929 28.4022C26.6541 28.4022 26.4141 28.311 26.2304 28.1285L21.8254 23.736C21.4566 23.3685 21.4566 22.7697 21.8254 22.4022C22.1941 22.0347 22.7941 22.0347 23.1629 22.4022L27.5679 26.7947C27.9366 27.1622 27.9366 27.761 27.5679 28.1285C27.3841 28.311 27.1429 28.4022 26.8929 28.4022Z" fill="currentColor"/>
              </svg>
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#FDF2CC] hover:text-[#C66C3C] transition-colors duration-200"
              aria-label="Open cart"
            >
              <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.77734 6.77734C9.77734 4.01977 12.0173 1.77979 14.7749 1.77979C17.5324 1.77979 19.7724 4.01977 19.7724 6.77734V8.22266H9.77734V6.77734ZM7.89734 8.22266V6.77734C7.89734 2.97977 10.9773 -0.100098 14.7749 -0.100098C18.5724 -0.100098 21.6524 2.97977 21.6524 6.77734V8.22266H25.7499C26.2699 8.22266 26.6899 8.64266 26.6899 9.16266V24.5401C26.6899 26.5576 25.0474 28.2001 23.0299 28.2001H6.51988C4.50238 28.2001 2.85986 26.5576 2.85986 24.5401V9.16266C2.85986 8.64266 3.27986 8.22266 3.79986 8.22266H7.89734Z" fill="currentColor"/>
              </svg>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C66C3C] text-[#FDF2CC] text-[10px] font-bold flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[97] bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 h-screen w-[320px] z-[98] flex flex-col"
              style={{ backgroundColor: '#241D19' }}
            >
              {/* Close */}
              <div className="flex items-center justify-between p-8">
                <span className="text-[#FDF2CC] font-bold tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, letterSpacing: '0.12em' }}>FLOURISH</span>
                <button onClick={() => setMobileOpen(false)} className="text-[#FDF2CC] hover:text-[#C66C3C] transition-colors" aria-label="Close menu">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 flex flex-col px-8 py-4 gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-3 text-2xl font-serif font-light transition-colors duration-200
                        ${pathname === link.href ? 'text-[#C66C3C]' : 'text-[#FDF2CC] hover:text-[#C66C3C]'}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom */}
              <div className="p-8 border-t border-white/10">
                <p className="text-[#CDBE8B] text-sm">
                  Mon–Fri: 7AM–8PM<br />
                  Sat–Sun: 8AM–6PM
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
