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
      typography: {
        DEFAULT: {
          css: {
            color: "#222222",
          },
        },
        invert: {
          css: {
            color: "#A8DADC",
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "blob-rotate": "blobRotate 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        blobRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
}
