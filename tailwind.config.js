/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-blue': '#24498e',
        'game-yellow': '#fccf26',
      }
    },
  },
  plugins: [],
}
