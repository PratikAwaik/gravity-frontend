/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-gray-400": "#242728",
        "theme-gray-300": "#242424",
        "theme-gray-200": "#5E6366", //
        "theme-blue": "#367bf5", // icons when clicked or hovered or buttons
        "theme-red": "#f26771",
        "theme-green": "#B8EF81",
        "theme-white-500": "#e1e1e1",
        "theme-white-400": "#c6cacc", // icons
        "theme-white-300": "#f3f3f4",
      },
      fontFamily: {
        "theme-font-family": "'Roboto', sans-serif",
      },
    },
  },
  plugins: [],
};
