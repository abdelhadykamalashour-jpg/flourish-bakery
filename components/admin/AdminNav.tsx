'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/admin', label: 'Orders' },
  { href: '/admin/products', label: 'Products' },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: '#241D19', borderColor: '#3a2f29' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 16,
              fontWeight: 700,
              color: '#FDF2CC',
              letterSpacing: '0.02em',
            }}
          >
            Flourish
            <span style={{ color: '#C66C3C' }}> — Admin</span>
          </span>

          <nav className="flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-1.5 rounded text-sm transition-colors"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: active ? '#FDF2CC' : '#9a8a7a',
                    backgroundColor: active ? '#3a2f29' : 'transparent',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sign out */}
        <a
          href="/api/admin/logout"
          className="text-xs transition-colors"
          style={{ color: '#9a8a7a', fontFamily: 'var(--font-sans)' }}
        >
          Sign Out
        </a>
      </div>
    </header>
  );
}
