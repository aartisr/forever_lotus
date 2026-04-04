import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        lotus: {
          bg: '#07080f',
          'bg-2': '#0c0e1a',
          'bg-3': '#111526',
          gold: '#c9a84c',
          'gold-light': '#e8b84b',
          'gold-bright': '#f0c650',
          'gold-dim': 'rgba(201,168,76,0.12)',
          pink: '#e887a6',
          'pink-light': '#f4b8cf',
          teal: '#0f9688',
          'teal-light': '#14b8a6',
          violet: '#7c3aed',
          cream: '#f0ece4',
          'cream-soft': '#e8e4dc',
          muted: '#8a8780',
          'muted-2': '#5e5c58',
          border: 'rgba(201,168,76,0.18)',
          'border-soft': 'rgba(255,255,255,0.07)',
          overlay: 'rgba(7,8,15,0.85)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', '"Playfair Display"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'lotus-radial': 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 50%, transparent 100%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,168,76,0.10) 0%, rgba(7,8,15,0) 70%)',
        'section-fade': 'linear-gradient(180deg, #07080f 0%, #0c0e1a 100%)',
        'card-surface': 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'pillar-hover': 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(232,135,166,0.06) 100%)',
      },
      boxShadow: {
        gold: '0 0 40px rgba(201,168,76,0.12)',
        'gold-strong': '0 0 80px rgba(201,168,76,0.22)',
        'gold-glow': '0 0 0 1px rgba(201,168,76,0.18), 0 8px 40px rgba(201,168,76,0.10)',
        lotus: '0 4px 24px rgba(232,135,166,0.12)',
        'card': '0 2px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.20)',
      },
      animation: {
        'lotus-spin-slow': 'lotusSpin 90s linear infinite',
        'lotus-spin-counter': 'lotusSpinCounter 120s linear infinite',
        'lotus-bloom': 'lotusBloom 2.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'float': 'float 7s ease-in-out infinite',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'shimmer': 'shimmer 4s linear infinite',
        'pulse-gold': 'pulseGold 4s ease-in-out infinite',
        'star-twinkle': 'starTwinkle 3s ease-in-out infinite',
        'text-shimmer': 'textShimmer 4s linear infinite',
        'nav-in': 'navIn 0.2s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        lotusSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        lotusSpinCounter: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        lotusBloom: {
          '0%': { transform: 'scale(0.4) rotate(-20deg)', opacity: '0' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,168,76,0.15)' },
          '50%': { boxShadow: '0 0 60px rgba(201,168,76,0.40)' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.9' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        navIn: {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
