import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { InnerHero } from '@/components/ui/InnerHero';
import { ScrollReveal, ScrollRevealHeading } from '@/components/ui/ScrollReveal';
import { WhyChooseSection } from '@/components/sections/WhyChooseSection';
import { teamMembers } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us — Our Story',
  description: 'Learn about Flourish Bakery — a family-owned artisan bakery in Cairo, crafting handmade baked goods since 2004.',
};

export default function AboutPage() {
  return (
    <>
      <InnerHero
        eyebrow="Our Story"
        title="Baked With Heart Since 2004"
        subtitle="A family bakery built on tradition, craft, and an obsession with quality."
        backgroundImage="/images/hero/about-hero.avif"
      />

      {/* Origin Story */}
      <section className="section-gap">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#F0DFB1]">
                <Image
                  src="/images/about/bakery-origin.avif"
                  alt="Our bakery origin"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal>
                <p className="text-[#C66C3C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  Where It All Began
                </p>
              </ScrollReveal>
              <ScrollRevealHeading>
                <h2>Two Hands, One Dream</h2>
              </ScrollRevealHeading>

              <ScrollReveal delay={0.1}>
                <div className="space-y-5 mt-8 text-[#524F45] leading-relaxed">
                  <p>
                    Flourish Bakery began in a quiet Cairo kitchen in 2004, when David and Elena Chen
                    converted their home into a one-table patisserie. Armed with recipes passed
                    down through three generations and a French culinary education, they set out to bring
                    the artisan traditions of Parisian boulangeries to the heart of Egypt.
                  </p>
                  <p>
                    What started as a weekend market stall grew into a full bakery — and then into two
                    beloved neighborhood destinations. The ethos has never changed: every item is made
                    by hand, every morning, using the finest ingredients we can source.
                  </p>
                  <p>
                    We source our butter from Brittany, our almonds from Sicily, and our organic wheat
                    from family farms in upstate New York. Nothing leaves our ovens unless it meets the
                    standard we would serve at our own table.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="flex items-center gap-3 mt-8">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[#C66C3C]" style={{ backgroundColor: '#F0DFB1' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#241D19" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[#C66C3C]" style={{ backgroundColor: '#F0DFB1' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#241D19" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mt-10">
                  <Link href="/menu" className="btn-primary">
                    <span className="btn-text-wrap">
                      <span className="btn-text-default">Explore Our Menu</span>
                      <span className="btn-text-hover">Explore Our Menu</span>
                    </span>
                    <span className="btn-circle">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-gap" style={{ backgroundColor: '#F0DFB1' }}>
        <div className="container-default">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '20+', label: 'Years of Craft' },
              { number: '50+', label: 'Items Baked Daily' },
              { number: '10k+', label: 'Happy Customers' },
              { number: '2', label: 'NYC Locations' },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={0.08 * i}>
                <div className="text-center">
                  <p className="font-serif font-bold text-[#241D19]" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
                    {stat.number}
                  </p>
                  <p className="text-[#524F45] text-sm tracking-wide mt-2">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose — reuse homepage component */}
      <WhyChooseSection />

      {/* Team */}
      <section className="section-gap" style={{ backgroundColor: '#F0DFB1' }}>
        <div className="container-default">
          <ScrollRevealHeading className="mb-12">
            <h2>The Hands Behind Every Loaf</h2>
          </ScrollRevealHeading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.id} delay={0.08 * i}>
                <div className="text-center group">
                  <div className="relative overflow-hidden rounded-2xl aspect-square bg-[#CDBE8B]/40 mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <p className="font-serif font-semibold text-[#241D19] text-lg">{member.name}</p>
                  <p className="text-[#C66C3C] text-xs tracking-wide uppercase font-medium mt-1">{member.role}</p>
                  <p className="text-[#524F45] text-sm mt-2 leading-relaxed">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Inline Video — Bakery in action */}
      <section className="section-gap">
        <div className="container-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <p className="text-[#C66C3C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  Inside Our Kitchen
                </p>
              </ScrollReveal>
              <ScrollRevealHeading>
                <h2>Every Morning Is A New Beginning</h2>
              </ScrollRevealHeading>
              <ScrollReveal delay={0.1}>
                <p className="text-[#524F45] leading-relaxed mt-6">
                  Before the city wakes, our bakers are already at work. By 4 AM the ovens are warm,
                  the doughs are shaped, and the air is filled with the scent of fresh bread and
                  caramelized butter. It is a ritual we have performed every single morning for over
                  twenty years.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden bg-[#241D19]" style={{ aspectRatio: '16/9' }}>
                <video
                  src="/videos/bakery-kitchen.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                      <path d="M6 4L16 10L6 16V4Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
