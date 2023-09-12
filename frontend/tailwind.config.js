/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "background-color": "#F2FFE5",
        "primary-text":"#020100",
        "Active-Text":"#56Ab69",
        "secondary":"#6c695f",
        "secondary-text":"#838078",
        "card-color":"#E6E3D8",
      }
    },
  },
  plugins: [],
}