const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: "#00B8AE",
        card: "#334155",
        "primary-light": "#66E6E6",
        secondary: "#1F2937",
        "dark-gray": "#384252",
        "light-gray": "#94A3B8",
        background: '#1F2937',
        foreground: '#FFFFFF',
        card: '#374151',
        "professional-gray1": "#334155",
        "professional-gray2": "#344765",
        gray: {
          25: "#fafafa",
          50: "#f2f2f2",
          100: "#e6e6e6",
          200: "#cccccc",
          300: "#b3b3b3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          800: "#333333",
          900: "#1a1a1a",
          925: "#0d0d0d",
        },
        dark: "#202C3C", // Custom dark mode background
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      screens: {
        mid: "880px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  variants: {
    extend: {
      "vtd-primary": colors.sky,
      "vtd-secondary": colors.gray,
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss/plugin")],
};
