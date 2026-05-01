/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#050818',
          900: '#0a0f2e',
          800: '#0d1540',
          700: '#111d5e',
        },
        indigo: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        glass: 'rgba(255,255,255,0.04)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0a0f2e 0%, #1a1060 40%, #0d1540 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        'gradient-accent': 'linear-gradient(135deg, #6366f1, #22d3ee)',
        'gradient-warm': 'linear-gradient(135deg, #f59e0b, #ef4444)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        glow: '0 0 40px rgba(99,102,241,0.3)',
        'glow-cyan': '0 0 30px rgba(34,211,238,0.2)',
        card: '0 4px 24px rgba(0,0,0,0.3)',
      },
animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(99,102,241,0.6)' },
        },
      },
    },
  },
  plugins: [],
}
