import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { FlavorSection } from '@/components/sections/FlavorSection';
import { SweetestDealsSection } from '@/components/sections/SweetestDealsSection';
import { AboutSnippetSection } from '@/components/sections/AboutSnippetSection';
import { WhyChooseSection } from '@/components/sections/WhyChooseSection';
import { FreshFromOvenSection } from '@/components/sections/FreshFromOvenSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { InstagramSection } from '@/components/sections/InstagramSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

export const metadata: Metadata = {
  title: 'Flourish Bakery — Artisan Baked Goods, Freshly Made Daily',
  description: 'Experience the finest artisan baked goods in Cairo — handmade croissants, sourdough, cakes, and pastries baked fresh every morning.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FlavorSection />
      <SweetestDealsSection />
      <AboutSnippetSection />
      <WhyChooseSection />
      <FreshFromOvenSection />
      <ReviewsSection />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
}
