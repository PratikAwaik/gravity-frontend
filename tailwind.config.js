module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // new color range (exact to reddit)
        "theme-gray-500": "#dae0e6", // background
        "theme-gray-field": "#f6f7f8", // input fields
        "theme-gray-line": "#EDEFF1", // borders
        "theme-gray-action-icon": "#878a8c", // icons
        "theme-nav-icon": "#1a1a1b", // nav icons
        "theme-gray-nav-icon-faded": "rgba(26,26,27,0.1)", // nav icons
        "theme-body-text-color": "#1c1c1c", // text color
        "theme-blue": "#0079d3", // button background
        "theme-blue-50": "#f6fafd", // very light blue (bg for sign up button hover)
        "theme-red": "#d93a00",
        "theme-post-line": "#cccccc", // border for post
        "theme-post-title-text-color": "#222222", // post title text color
        "theme-post-icon-color": "#898989", // post border on hover
      },
      fontFamily: {
        "theme-font-family": "'IBM Plex Sans',sans-serif",
        "theme-font-family-noto": "'Noto Sans',sans-serif",
      },
    },
  },
  plugins: [],
};
