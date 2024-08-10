/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'myblack': '#121212',
        'primary': '#425AC2',
      },
    },
  },
  plugins: [],
}