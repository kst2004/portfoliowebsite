/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#14181e',
        bgSecondary: '#393E46',
        accentGold: '#B55400',
        accentSoft: '#EEEEEE',
        glass: 'rgba(255,255,255,0.06)',
      },
      boxShadow: {
        soft: '0 22px 55px rgba(0, 0, 0, 0.35)',
        glow: '0 0 0 1px rgba(181, 84, 0, 0.2), 0 18px 40px rgba(181, 84, 0, 0.16)',
      },
      backgroundImage: {
        'cinematic-vignette': 'radial-gradient(circle at 20% 18%, rgba(181, 84, 0, 0.09), transparent 45%), radial-gradient(circle at 80% 70%, rgba(181, 84, 0, 0.05), transparent 40%)',
      },
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['General Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slow-zoom': 'slow-zoom 8s ease-in-out infinite alternate',
        'fade-up': 'fade-up 1s cubic-bezier(0.2, 1, 0.2, 1) both',
      },
    },
  },
  plugins: [],
};