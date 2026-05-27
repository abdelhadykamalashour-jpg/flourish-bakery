'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { StarRating } from '@/components/ui/StarRating';
import { ProductCard } from '@/components/ui/ProductCard';
import { ScrollRevealHeading } from '@/components/ui/ScrollReveal';
import { products } from '@/lib/data';
import { useCart } from '@/lib/cartContext';

interface Props {
  params: { slug: string };
}

export default function ProductPage({ params }: Props) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const images = product.images.length > 1
    ? product.images
    : [product.image, product.image, product.image, product.image];

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(
      { id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image },
      quantity
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const isOnSale = product.originalPrice > product.price;

  return (
    <>
      {/* Breadcrumb */}
      <div className="container-default pt-28 pb-4">
        <nav className="flex items-center gap-2 text-sm text-[#524F45]">
          <Link href="/" className="hover:text-[#C66C3C] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/menu" className="hover:text-[#C66C3C] transition-colors">Menu</Link>
          <span>/</span>
          <span className="text-[#241D19]">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="pb-24">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl aspect-square mb-4 bg-[#F0DFB1]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[activeImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-[#C66C3C] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                      activeImage === i
                        ? 'ring-2 ring-[#C66C3C] ring-offset-2'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{ width: 80, height: 80 }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:pt-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Category */}
                <p className="text-[#C66C3C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                  {product.categoryLabel}
                </p>

                {/* Name */}
                <h1
                  className="text-[#241D19] mb-4"
                  style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.2, fontFamily: 'Playfair Display, serif' }}
                >
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <StarRating rating={product.rating} size={16} showValue />
                  <span className="text-[#524F45] text-sm">({product.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-[#241D19] font-serif font-semibold" style={{ fontSize: 36 }}>
                    EGP {product.price.toFixed(0)}
                  </span>
                  {isOnSale && (
                    <span className="text-[#524F45] text-lg line-through">
                      EGP {product.originalPrice.toFixed(0)}
                    </span>
                  )}
                  {isOnSale && (
                    <span className="text-[#C66C3C] text-sm font-semibold">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-[#524F45] leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Details */}
                <div className="mb-8">
                  <p className="text-[#241D19] font-semibold text-sm uppercase tracking-wide mb-3">
                    What&apos;s Inside
                  </p>
                  <ul className="space-y-2">
                    {product.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#524F45] text-sm">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill="#F0DFB1" />
                          <path d="M5 8L7 10L11 6" stroke="#C66C3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity + Add to Cart */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Quantity Picker */}
                  <div className="flex items-center gap-0 rounded-full overflow-hidden" style={{ border: '1.5px solid #CDBE8B' }}>
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-11 h-11 flex items-center justify-center text-[#241D19] hover:bg-[#F0DFB1] transition-colors text-lg font-light"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-[#241D19] font-medium text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-11 h-11 flex items-center justify-center text-[#241D19] hover:bg-[#F0DFB1] transition-colors text-lg font-light"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary justify-center"
                    style={{ height: 48 }}
                  >
                    <span className="btn-text-wrap">
                      <span className="btn-text-default">
                        {addedToCart ? 'Added!' : 'Add to Cart'}
                      </span>
                      <span className="btn-text-hover">
                        {addedToCart ? 'Added!' : 'Add to Cart'}
                      </span>
                    </span>
                    <span className="btn-circle">
                      {addedToCart ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  </button>
                </div>

                {/* Delivery note */}
                <div className="flex items-center gap-2 text-sm text-[#524F45]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 10H9V3H1V10ZM9 5H12L14 7V10H9V5Z" stroke="#CDBE8B" strokeWidth="1.2" strokeLinejoin="round" />
                    <circle cx="3.5" cy="12" r="1.5" stroke="#CDBE8B" strokeWidth="1.2" />
                    <circle cx="11.5" cy="12" r="1.5" stroke="#CDBE8B" strokeWidth="1.2" />
                  </svg>
                  <span>Free delivery on orders over EGP 500 · Same-day if ordered before 11 AM</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-gap" style={{ backgroundColor: '#FDF2CC' }}>
          <div className="container-default">
            <ScrollRevealHeading className="mb-12">
              <h2>You May Also Love</h2>
            </ScrollRevealHeading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
