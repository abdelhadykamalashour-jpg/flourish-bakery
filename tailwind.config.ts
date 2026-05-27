import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — extracted from original
        'cream': '#FDF2CC',        // Primary background
        'dark-brown': '#241D19',   // Deep dark (nav, headings)
        'cta-orange': '#C66C3C',   // Primary CTA button
        'warm-brown': '#6B4C3B',   // Warm brown
        'beige': '#F0DFB1',        // Section backgrounds
        'body-text': '#524F45',    // Body copy
        'accent-brown': '#412D24', // Darker accent
        'muted-gold': '#CDBE8B',   // Muted gold
        'nav-bg': 'rgba(36,29,25,0.8)', // Transparent nav
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      fontSize: {
        'h1': ['120px', { lineHeight: '144px', fontWeight: '800' }],
        'h2': ['80px', { lineHeight: '96px', fontWeight: '600' }],
        'h3': ['48px', { lineHeight: '58px', fontWeight: '600' }],
        'h4': ['36px', { lineHeight: '44px', fontWeight: '600' }],
        'h5': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h6': ['18px', { lineHeight: '24px', fontWeight: '600' }],
      },
      maxWidth: {
        'container': '1840px',
        'default': '1200px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(50px) skewX(5deg) skewY(5deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) skewX(0) skewY(0)' },
        },
        'counter-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
        'fade-in-up': 'fade-in-up 0.7s ease forwards',
      },
    },
  },
  plugins: [],
}
export default config
