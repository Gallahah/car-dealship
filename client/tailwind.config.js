/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-20": "#F5F3F4",
        "light-100": "#F0B19C",
        "light-200": "#E7815F",
        "primary-100": "#9BBBE5",
        "dark-100": "#78AADD",
        "dark-200": "#488CCD",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      lora: ["Lora", "serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
}

