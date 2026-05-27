import type { Metadata } from 'next';
import { Playfair_Display, Jost } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartProvider } from '@/lib/cartContext';
import { LenisProvider } from '@/lib/lenisProvider';
import { PageLoader } from '@/components/ui/PageLoader';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Flourish Bakery — Artisan Baked Goods',
    template: '%s | Flourish Bakery',
  },
  description: 'A family-owned artisan bakery crafting handmade baked goods with the finest ingredients — baked daily, delivered fresh. Croissants, sourdough, cakes & pastries.',
  keywords: ['bakery', 'artisan bread', 'croissants', 'pastries', 'fresh baked', 'Cairo bakery', 'Egypt bakery'],
  authors: [{ name: 'Flourish Bakery' }],
  creator: 'NovaCraft',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Flourish Bakery — Artisan Baked Goods',
    description: 'Handmade baked goods with the finest ingredients. Baked daily, delivered fresh.',
    siteName: 'Flourish Bakery',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jost.variable} ${playfairDisplay.variable}`}>
      <body className={`${jost.variable} ${playfairDisplay.variable} font-sans bg-[#FAF6F0]`}>
        <CartProvider>
          <LenisProvider />
          <PageLoader />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
