/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#070708',
          900: '#0c0c0e',
          800: '#121215',
          700: '#1a1a1f',
          600: '#242429',
          500: '#3a3a42',
          400: '#6b6b75',
          300: '#9a9aa3',
          200: '#c8c8ce',
          100: '#e8e8eb',
        },
        accent: {
          DEFAULT: '#c8a87a',
          soft: '#d4bc96',
          muted: 'rgba(200, 168, 122, 0.15)',
        },
      },
      fontFamily: {
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 12vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 7vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        section: 'clamp(5rem, 12vh, 10rem)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
