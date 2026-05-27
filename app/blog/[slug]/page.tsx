import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { InnerHero } from '@/components/ui/InnerHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { blogPosts } from '@/lib/data';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <>
      <InnerHero
        eyebrow={post.category}
        title={post.title}
        backgroundImage={post.image}
      />

      <article className="section-gap">
        <div className="container-md">
          {/* Meta */}
          <ScrollReveal>
            <div className="flex items-center gap-3 text-sm text-[#524F45] mb-10">
              <Link href="/blog" className="hover:text-[#C66C3C] transition-colors">← Back to Journal</Link>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </ScrollReveal>

          {/* Hero Image */}
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl bg-[#F0DFB1] mb-12" style={{ aspectRatio: '16/7' }}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal>
            <div className="prose prose-lg max-w-none" style={{ color: '#524F45', lineHeight: 1.9 }}>
              <p className="text-xl leading-relaxed text-[#241D19] font-medium mb-6">
                {post.excerpt}
              </p>
              {post.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-5 text-[#524F45] leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Extended content */}
              <p className="mb-5">
                The process begins with selecting only the finest ingredients. We believe that
                exceptional baking starts long before the oven is heated — it begins at the source,
                with farmers and producers who share our commitment to quality.
              </p>
              <p className="mb-5">
                Each recipe at Flourish has been refined through hundreds of iterations. We bake,
                taste, adjust, and bake again — sometimes over the course of weeks — until we achieve
                the exact texture, flavor, and appearance we envision.
              </p>
              <p className="mb-5">
                The reward is what you taste in every bite: the crackling crust of a perfectly
                baked sourdough, the laminated layers of a butter croissant, the delicate crumb of
                a vanilla cupcake. These are not accidents. They are the result of craft, patience,
                and an unwavering dedication to the art of baking.
              </p>
              <p>
                We hope that when you sit down with one of our pastries, you taste not just
                the ingredients, but the care and intention behind every step.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </article>

      {/* Related Posts */}
      <section className="section-gap" style={{ backgroundColor: '#F0DFB1' }}>
        <div className="container-default">
          <h3 className="text-[#241D19] mb-10">Continue Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((relPost, i) => (
              <ScrollReveal key={relPost.id} delay={0.08 * i}>
                <Link href={`/blog/${relPost.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-white mb-4" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={relPost.image}
                      alt={relPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="33vw"
                    />
                  </div>
                  <p className="text-[#C66C3C] text-xs tracking-[0.15em] uppercase font-semibold mb-2">
                    {relPost.category}
                  </p>
                  <h3 className="text-[#241D19] group-hover:text-[#C66C3C] transition-colors duration-300">
                    {relPost.title}
                  </h3>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
