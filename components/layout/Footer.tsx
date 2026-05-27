import Link from 'next/link';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/menu', label: 'Menu' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact-us', label: 'Contact Us' },
];

const pagesLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/menu', label: 'Shop' },
  { href: '/contact-us', label: 'Get in Touch' },
];

const socialLinks = [
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    href: 'https://youtube.com',
    label: 'YouTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    )
  },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#241D19' }}>
      {/* Top Info Bar */}
      <div className="border-b border-white/10 py-6">
        <div className="container-default">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Hours */}
            <div className="flex items-center gap-6">
              <div className="text-[#CDBE8B] text-sm">
                <span className="font-semibold text-[#FDF2CC]">Monday – Friday:</span>
                <span className="ml-2">7:00 AM – 8:00 PM</span>
              </div>
              <div className="w-px h-6 bg-white/20 hidden md:block" />
              <div className="text-[#CDBE8B] text-sm">
                <span className="font-semibold text-[#FDF2CC]">Saturday – Sunday:</span>
                <span className="ml-2">8:00 AM – 6:00 PM</span>
              </div>
            </div>

            {/* Delivery Partners */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-[#CDBE8B] text-sm font-semibold">Our Delivery Partners</span>
              <div className="w-px h-5 bg-white/20" />
              <div className="flex items-center gap-3">
                {/* Partner logos — text fallback */}
                <span className="text-[#FDF2CC]/50 text-xs font-medium tracking-wider">SWISS</span>
                <span className="text-[#FDF2CC]/50 text-xs font-medium tracking-wider">SEOUL</span>
                <span className="text-[#FDF2CC]/50 text-xs font-medium tracking-wider">HUDSON</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-gap">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-flex flex-col items-start gap-0 mb-6">
                <span
                  className="text-[#FDF2CC] font-bold tracking-wider"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, letterSpacing: '0.12em' }}
                >
                  FLOURISH
                </span>
                <span
                  className="text-[#CDBE8B]"
                  style={{ fontFamily: 'Lora, serif', fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase' }}
                >
                  Bakery
                </span>
              </Link>
              <p className="text-[#CDBE8B] text-sm leading-relaxed">
                A family-owned bakery rooted in tradition and crafted with passion. Every item is handmade using the finest ingredients — baked daily, delivered fresh.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[#FDF2CC] font-semibold text-sm tracking-widest uppercase mb-6">Quick Links</h3>
              <div className="flex flex-col gap-3">
                {quickLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[#CDBE8B] text-sm hover:text-[#C66C3C] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div>
              <h3 className="text-[#FDF2CC] font-semibold text-sm tracking-widest uppercase mb-6">Pages</h3>
              <div className="flex flex-col gap-3">
                {pagesLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[#CDBE8B] text-sm hover:text-[#C66C3C] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-[#FDF2CC] font-semibold text-sm tracking-widest uppercase mb-6">Connect</h3>
              <div className="flex flex-col gap-3 mb-8">
                <p className="text-[#CDBE8B] text-sm">Sodic East Compound, Cairo, Egypt</p>
                <a href="tel:+201004852787" className="text-[#CDBE8B] text-sm hover:text-[#C66C3C] transition-colors">01004852787</a>
                <a href="mailto:hello@flourish-bakery.com" className="text-[#CDBE8B] text-sm hover:text-[#C66C3C] transition-colors">hello@flourish-bakery.com</a>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#CDBE8B] hover:text-[#C66C3C] hover:border-[#C66C3C] transition-all duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container-default flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#CDBE8B]/90 text-xs">
            © {new Date().getFullYear()} Flourish Bakery. All rights reserved.
          </p>
          <p className="text-[#CDBE8B]/90 text-xs">
            Crafted with passion by <span className="text-[#CDBE8B]">NovaCraft</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
