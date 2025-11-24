/** @type {import('tailwindcss').Config}
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0f172a",
        card: "#1e293b",
        blue: "#64d2ff",
        gold: "#facc15",
        text: "#e2e8f0"
      }
    }
  },
  plugins: []
}
