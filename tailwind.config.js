/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#222222",
        secondary: "#FF6D1F",
        tertiary: "#F5E7C6",
        light: "#FAF3E1",
        darkPrimary: "#051829",
        darkSecondary: "#296374",
        darkTertiary: "#629FAD",
        darkLight: "#EDEDCE",
        accent: "#FF6D1F",
        darkAccent: "#629FAD",
      },
    },
  },
  plugins: [],
}
