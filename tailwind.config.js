/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cinematic: {
          bg: 'rgb(var(--cinematic-bg-rgb) / <alpha-value>)',
          surface: 'rgb(var(--cinematic-surface-rgb) / <alpha-value>)',
          surfaceSoft: 'rgb(var(--cinematic-surface-soft-rgb) / <alpha-value>)',
          elevated: 'rgb(var(--cinematic-elevated-rgb) / <alpha-value>)',
          text: 'rgb(var(--cinematic-text-rgb) / <alpha-value>)',
          muted: 'rgb(var(--cinematic-muted-rgb) / <alpha-value>)',
          gold: 'rgb(var(--cinematic-gold-rgb) / <alpha-value>)',
          crimson: 'rgb(var(--cinematic-crimson-rgb) / <alpha-value>)',
          bronze: 'rgb(var(--cinematic-bronze-rgb) / <alpha-value>)',
          ivory: 'rgb(var(--cinematic-ivory-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'spotlight-radial': 'var(--bg-spotlight-radial)',
        'hero-vignette': 'var(--bg-hero-vignette)',
        'hero-bottom': 'var(--bg-hero-bottom)',
        'card-fade': 'var(--bg-card-fade)',
        'crimson-fade': 'var(--bg-crimson-fade)',
      },
      boxShadow: {
        gold: 'var(--shadow-gold)',
        card: 'var(--shadow-card)',
        glow: 'var(--shadow-glow)',
      },
      animation: {
        'pulse-play': 'pulse-play 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-play': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.08)', opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
