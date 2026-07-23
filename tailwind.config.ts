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
        "pb-black": "#0F0F0E",
        "pb-white": "#FFFFFF",
        "pb-accent": "#F49C1A",
        "pb-muted": "#9D9D9D",
        "pb-border": "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        title: ["var(--font-bodoni)", "serif"],
      },
      keyframes: {},
    },
  },
  plugins: [],
};
