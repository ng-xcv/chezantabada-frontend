/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50:  '#eff8ff',
          100: '#dff0ff',
          200: '#b8e2ff',
          300: '#7aceff',
          400: '#38b5ff',
          500: '#1E90FF',
          600: '#0070e0',
          700: '#0058b8',
          800: '#004a96',
          900: '#003d7a',
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
        ink:   '#111111',
        muted: '#6b7280',
        light: '#f8faff',
        silk:  '#eef4ff',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        script:  ['"Dancing Script"', 'cursive'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #e8d5a3 50%, #C9A84C 100%)',
        'blue-gradient': 'linear-gradient(135deg, #003d7a 0%, #1E90FF 60%, #38b5ff 100%)',
        'hero-gradient': 'linear-gradient(135deg, #003d7a 0%, #1E90FF 100%)',
        'gold-shine':    'linear-gradient(90deg, #C9A84C, #e8d5a3, #C9A84C)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'float':   'float 3s ease-in-out infinite',
        'shine':   'shine 3s ease-in-out infinite',
        'pulse-blue': 'pulseBlue 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        shine: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        pulseBlue: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(30,144,255,0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(30,144,255,0)' },
        },
      },
      boxShadow: {
        'blue-sm':  '0 4px 14px rgba(30,144,255,0.15)',
        'blue-md':  '0 8px 30px rgba(30,144,255,0.25)',
        'blue-lg':  '0 20px 60px rgba(30,144,255,0.30)',
        'gold-sm':  '0 4px 14px rgba(201,168,76,0.20)',
        'gold-md':  '0 8px 30px rgba(201,168,76,0.30)',
      },
    },
  },
  plugins: [],
}
