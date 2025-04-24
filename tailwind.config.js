// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        plum: "#67267d",         // Deepest purple
        orchid: "#8431a0",       // Bold vibrant violet
        amethyst: "#b25fce",     // Mid-light purple
        lavender: "#c382d9",     // Soft lavender
        lilac: "#d8aee6",        // Pale pastel purple

        snow: "#F9FAFB",         // Clean, soft white
        coal: "#1A1A1A",         // Neutral dark
        ash: "#999999",          // Muted gray

        meadow: "#4CAF50",       // ✅ Success green
        rose: "#FF5F5F",         // ❌ Error red
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
}
