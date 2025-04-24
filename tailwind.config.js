/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zentra-blue': '#1a1a2e',
        'zentra-black': '#0f0f0f',
        'zentra-purple': '#6a0dad',
        'zentra-light': '#ffffff'
      }
    },
  },
  plugins: [],
}