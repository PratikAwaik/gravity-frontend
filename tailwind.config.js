module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-gray-400": "#242728",
        "theme-gray-300": "#3e4345",
        "theme-gray-200": "#5E6366", //
        "theme-blue": "#367bf5", // icons when clicked or hovered or buttons
        "theme-red": "#f26771",
        "theme-green": "#B8EF81",
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
