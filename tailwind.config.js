/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'quintessential': ['Quintessential', 'cursive'],
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 