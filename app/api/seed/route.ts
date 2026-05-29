import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { products } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const results: string[] = [];

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {
        name: p.name,
        slug: p.slug,
        price: p.price,
        originalPrice: p.originalPrice,
        isAvailable: p.inStock,
        description: p.description,
        imageUrl: p.image,
        images: p.images,
        rating: p.rating,
        reviewCount: p.reviewCount,
        category: p.category,
        categoryLabel: p.categoryLabel,
        details: p.details,
        badge: p.badge ?? null,
      },
      create: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        originalPrice: p.originalPrice,
        isAvailable: p.inStock,
        description: p.description,
        imageUrl: p.image,
        images: p.images,
        rating: p.rating,
        reviewCount: p.reviewCount,
        category: p.category,
        categoryLabel: p.categoryLabel,
        details: p.details,
        badge: p.badge ?? null,
      },
    });
    results.push(p.name);
  }

  console.log('Seeding complete at:', new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));

  return NextResponse.json({
    success: true,
    seeded: results.length,
    products: results,
    timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }),
  });
}
