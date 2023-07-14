/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        doctorTheme: {
          primary: "#6c5ce7",
          secondary: "#19D3AE",
          accent: "#3A4256",
          "base-100": "#FFFFFF"
        },
      },
    ],
  },
  theme: {
    extend: {},
  },

  plugins: [require("daisyui")],
}