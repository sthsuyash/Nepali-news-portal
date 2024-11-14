/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      body: ["Montserrat", "sans-serif"],
      login: ["Fredoka", "sans-serif"],
    },
    extend: {
      spacing: {
        50: "50px",
        100: "100px",
      },
    },
  },
  plugins: [],
};
