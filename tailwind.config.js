/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0f172a",        // deep navy void
        card: "#1e293b",      // card backgrounds
        blue: "#64d2ff",      // electric icy blue
        gold: "#facc15",      // golden yellow
        text: "#e2e8f0",      // soft white text
        "text-muted": "#94a3b8"
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      }
    }
  },
  plugins: []
}
