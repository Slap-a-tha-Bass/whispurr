/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#40F99B",
      }
    },
    fontFamily: {
      logo: ["Roboto", "monospace"],
    }
  },
  plugins: [],
};
