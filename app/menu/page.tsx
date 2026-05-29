import { prisma } from '@/lib/prisma';
import { InnerHero } from '@/components/ui/InnerHero';
import { MenuClient } from './MenuClient';
import type { Product } from '@/lib/data';

export const dynamic = 'force-dynamic';

function mapToProduct(p: {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  isAvailable: boolean;
  description: string | null;
  imageUrl: string | null;
  images: unknown;
  rating: number;
  reviewCount: number;
  category: string;
  categoryLabel: string;
  details: unknown;
  badge: string | null;
}): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.imageUrl ?? '',
    images: (p.images as string[]) ?? [],
    rating: p.rating,
    reviewCount: p.reviewCount,
    category: p.category as Product['category'],
    categoryLabel: p.categoryLabel,
    description: p.description ?? '',
    details: (p.details as string[]) ?? [],
    badge: p.badge ?? undefined,
    inStock: p.isAvailable,
  };
}

export default async function MenuPage() {
  const dbProducts = await prisma.product.findMany({
    where: { isAvailable: true },
    orderBy: { name: 'asc' },
  });

  const allProducts = dbProducts.map(mapToProduct);
  const featuredDeals = allProducts.filter(p => p.originalPrice > p.price).slice(0, 6);

  return (
    <>
      <InnerHero
        eyebrow="Our Menu"
        title="Freshly Baked, Daily"
        subtitle="Every item crafted by hand with the finest seasonal ingredients."
        backgroundImage="/images/hero/menu-hero.avif"
      />
      <MenuClient allProducts={allProducts} featuredDeals={featuredDeals} />
    </>
  );
}
