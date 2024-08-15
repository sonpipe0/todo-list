/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");



export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'myblack': '#121212',
        'primary': '#425AC2',
      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
      }
    },
  },
  darkmode: "class" ,
  plugins: [nextui()],
}

