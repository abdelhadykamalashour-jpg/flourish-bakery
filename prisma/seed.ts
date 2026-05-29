import { PrismaClient } from '@prisma/client';
import { products } from '../lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${products.length} products...`);

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
    console.log(`  ✓ ${p.name}`);
  }

  console.log('\nSeeding complete at:', new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
