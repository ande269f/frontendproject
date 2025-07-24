// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|button|modal|table|popover|divider|ripple|spinner|checkbox|form|spacer).js"
  ],
  theme: { extend: {} },
  darkMode: "class",
  plugins: [heroui()],
};