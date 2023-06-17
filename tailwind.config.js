/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'valencia': {
          50: "#fef3f2",
          100: '#fde8e6',
          200: '#fad3d1',
          300: '#f5b0ac',
          400: '#ef807d',
          500: '#e4504f',
          600: '#d44046',
          700: '#ae222b',
          800: '#921f2a',
          900: '#7d1e2a',
          950: '#460b11',
        },
        'turquoise': {
          50: "#f0fdfb",
          100: '#cdfaf4',
          200: '#9bf4eb',
          300: '#61e7dd',
          400: '#40d4ce',
          500: '#17b5b0',
          600: '#109191',
          700: '#117474',
          800: '#135a5c',
          900: '#144c4d',
          950: '#052c2e',
        },
      }
    },
  },
  plugins: [],
}
