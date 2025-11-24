/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0f172a",
        card: "#1e293b",
        blue: "#64d2ff",
        gold: "#facc15",
        muted: "#94a3b8",
        text: "#e2e8f0"
      }
    }
  },
  plugins: [],
}
