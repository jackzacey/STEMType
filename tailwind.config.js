/** @type {import('tailwindcss').Config */
theme: {
  extend: {
    fontFamily: {
      mono: ['"Roboto Mono"', 'Menlo', 'monospace'],
    },
  },
},
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",        // true matte black (Grok exact)
        card: "#111111",      // subtle panel depth
        accent: "#3b82f6",    // calm blue (instead of neon #64d2ff)
        gold: "#fbbf24",      // softer gold
        muted: "#94a3b8",
        text: "#f1f5f9"       // cleaner white
      },
      backgroundImage: {
        'subtle-grain': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"4\" height=\"4\" viewBox=\"0 0 4 4\"%3E%3Cpath fill=\"%23ffffff\" fill-opacity=\"0.02\" d=\"M1 3h1v1H1V3zm2-2h1v1H3V1z\"%3E%3C/path%3E%3C/svg%3E')",
      }
    }
  },
  plugins: []
}
