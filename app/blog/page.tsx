import type { Metadata } from 'next';
import { InnerHero } from '@/components/ui/InnerHero';
import { BlogFilter } from '@/components/sections/BlogFilter';

export const metadata: Metadata = {
  title: 'Journal — Baking Stories & Guides',
  description: 'Read stories from our bakery — from sourcing the finest ingredients to the craft behind each recipe.',
};

export default function BlogPage() {
  return (
    <>
      <InnerHero
        eyebrow="Our Journal"
        title="Stories From The Bakery"
        subtitle="Thoughts, recipes, and the philosophy behind what we bake."
        backgroundImage="/images/hero/blog-hero.avif"
      />
      <BlogFilter />
    </>
  );
}
