/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
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
        night: '#0a0a0a',
        ink:   '#111111',
        cream: '#faf8f4',
        silk:  '#f0ebe3',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        script:  ['"Dancing Script"', 'cursive'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #e8d5a3 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'float':   'float 3s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
}
