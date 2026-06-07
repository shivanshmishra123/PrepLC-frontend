/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7E22CE', // User specified purple
          hover: '#9333ea',   // Slightly lighter for hover
          light: '#a855f7',   // Even lighter
        },
        dark: {
          DEFAULT: '#0a0a0a', // Near black for gradient end
          lighter: '#390E5D', // User specified background base
          card: '#2e1065',    // Dark violet for cards
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
