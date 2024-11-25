module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-orange": "var(--Primary-Orange)",
        "primary-black": "var(--Primary-Black)",
        "custom-black": "#141214",
      },
      fontFamily: {
        sans: ["var(--font-open-sans)"],
        title: ["var(--font-montserrat)"],
      },
      keyframes: {},
    },
  },
  plugins: [],
};
