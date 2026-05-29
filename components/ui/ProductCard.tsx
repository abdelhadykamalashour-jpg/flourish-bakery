'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StarRating } from './StarRating';
import { useCart } from '@/lib/cartContext';
import type { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const hasDiscount = product.originalPrice > product.price;

  return (
    <Link href={`/product/${product.slug}`} className="menu-card group flex flex-col h-full">
      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#E8E3D9] rounded-md">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-[#C66C3C] text-[#FDF2CC] text-[10px] font-semibold px-2 py-1 rounded-full tracking-wide">
              {product.badge}
            </div>
          </div>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-[#241D19]/60 flex items-center justify-center">
            <span className="text-[#FDF2CC] text-sm font-medium tracking-widest uppercase">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info — flex-grow so all cards in a row share equal height */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Rating + Name — grows to fill available space */}
        <div className="flex-grow">
          {/* Rating */}
          <StarRating rating={product.rating} size={12} className="mb-2" />

          {/* Name */}
          <h3 className="text-[#241D19] font-serif text-base font-semibold mb-2 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Price row — pinned to bottom of card */}
        <div className="flex items-center justify-between gap-2 mt-3">
          <div className="flex items-center gap-2">
            <span className="text-[#C66C3C] font-semibold text-base">
              EGP {product.price.toFixed(0)}
            </span>
            {hasDiscount && (
              <span className="text-[#CDBE8B] text-sm line-through">
                EGP {product.originalPrice.toFixed(0)}
              </span>
            )}
          </div>

          {/* Add to cart */}
          {product.inStock ? (
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 bg-[#241D19] text-[#FDF2CC] text-xs font-medium px-3 py-2 rounded-full hover:bg-[#C66C3C] transition-colors duration-200"
              aria-label={`Add ${product.name} to cart`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Add</span>
            </motion.button>
          ) : (
            <span className="text-[#CDBE8B] text-xs font-medium">Sold Out</span>
          )}
        </div>
      </div>
    </Link>
  );
}
