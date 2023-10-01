/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBG: "#1C1C1C",
        sidebarBG: "#131313",
        selectInputBG: "#2b2b2b",
        tableHD: "#303030",
        cardBorder: "#636363",
        hoverBG:"#282828"
      },
    },
  },
  plugins: [],
};
