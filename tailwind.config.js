/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./pages/**/*.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
]
  theme: {
    extend: {
      colors: {
        bg: "#0f172a",
        card: "#1e293b",
        blue: "#64d2ff",
        gold: "#facc15",
        text: "#e2e8f0",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
