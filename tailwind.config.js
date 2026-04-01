/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2563EB',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e2d6b',
        },
        gold: {
          50:  '#fdfbf0',
          100: '#faf3d1',
          200: '#f5e49a',
          300: '#eece62',
          400: '#e8b830',
          500: '#C9A84C',
          600: '#a07830',
          700: '#7a5a22',
          800: '#5a4018',
          900: '#3c2a0e',
        },
        night:    '#000000',
        ink:      '#111111',
        cream:    '#f0f4ff',
        silk:     '#e8eeff',
        sapphire: '#2563EB',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        script:  ['"Dancing Script"', 'cursive'],
      },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(135deg, #C9A84C 0%, #e8d5a3 50%, #C9A84C 100%)',
        'blue-gradient':  'linear-gradient(135deg, #1e3a8a 0%, #2563EB 50%, #60a5fa 100%)',
        'dark-gradient':  'linear-gradient(180deg, #000000 0%, #0a0f2e 100%)',
        'hero-gradient':  'linear-gradient(135deg, #000000 0%, #0a1628 60%, #1e3a8a 100%)',
      },
      animation: {
        'fade-up':  'fadeUp 0.6s ease-out forwards',
        'shimmer':  'shimmer 2s infinite',
        'float':    'float 3s ease-in-out infinite',
        'glow':     'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%':   { boxShadow: '0 0 10px #2563EB40' },
          '100%': { boxShadow: '0 0 30px #2563EB80, 0 0 60px #2563EB40' },
        },
      },
    },
  },
  plugins: [],
}
