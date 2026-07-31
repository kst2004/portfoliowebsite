/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Three-colour theme. `white` (#FFFFFF) comes from Tailwind's default
      // palette and carries every text/border tone via opacity modifiers.
      colors: {
        ink: '#050505',      // near-black page background — see globals.css
        graphite: '#131313',  // dark grey — solid (non-glass) raised surfaces
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0, 0, 0, 0.15)',
        glow: '0 0 0 1px rgba(255, 255, 255, 0.12), 0 18px 44px rgba(0, 0, 0, 0.22)',
      },
      backgroundImage: {
        'cinematic-vignette': 'radial-gradient(circle at 20% 18%, rgba(255, 255, 255, 0.055), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.03), transparent 40%)',
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