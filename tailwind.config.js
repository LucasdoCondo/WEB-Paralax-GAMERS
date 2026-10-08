/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0f',
          dark: '#06060a',
          light: '#1a1a2e',
        },
        neon: {
          cyan: '#00f0ff',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          pink: '#ec4899',
          green: '#10b981',
          red: '#ef4444',
        },
        border: 'rgba(255, 255, 255, 0.1)',
        card: '#12121a',
        cardHover: '#1a1a2e',
        text: {
          PRIMARY: '#f1f5f9',
          SECONDARY: '#94a3b8',
          MUTED: '#64748b',
          INCONISTENT: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Oswald', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['42px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['24px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'hover-glow': 'hoverGlow 2s ease-in-out infinite alternate',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        hoverGlow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)' },
        },
        pulseNeon: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
