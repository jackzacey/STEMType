module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-navy': '#0f172a',  // calm navy void (instead of pure black)
        'blue-primary': '#64d2ff',  // icy sky blue for Bio/science
        'gold-accent': '#facc15',   // soft golden for highlights
        'text-light': '#e2e8f0',    // soft white for readability
        'card': '#1e293b',          // subtle panels
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  },
  plugins: []
}
