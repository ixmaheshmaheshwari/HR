/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'latobold': ['Lato-Bold', 'sans-serif'],
      },
      animation: {
        'pingonce-input': 'ping-once-input 1s cubic-bezier(0, 0, 0.2, 1)',
      },
      keyframes: {
        'ping-once-input': {
          '0%': { transform: 'scale(1)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

