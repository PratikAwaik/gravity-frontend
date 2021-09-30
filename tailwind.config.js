module.exports = {
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "theme-black": "#141821",
        "theme-green": "#48bb78",
        "theme-purple": "#805ad5",
        "theme-orange": "#ed8936",
        "theme-red": "#e53e3e",
        "theme-blue": "#3182ce",
        "theme-white": "#e2e8f0",
        "theme-gray": "#4a5568",
      },
      fontFamily: {
        "theme-font": "Ubuntu, sans-serif",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
