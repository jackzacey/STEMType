JavaScript/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",      // Grok's true matte black void
        card: "#111",       // subtle layer for panels (Grok-style depth)
        blue: "#64d2ff",    // your icy accent
        gold: "#facc15",    // your golden highlight
        muted: "#94a3b8",
        text: "#e2e8f0"     // soft white for readability
      }
    }
  },
  plugins: []
}
