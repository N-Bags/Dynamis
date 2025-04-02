/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2563eb', // Trust & Clarity
          green: '#059669', // Growth & Stability
        },
        secondary: {
          grey: '#6b7280',
          white: '#ffffff',
        },
        accent: {
          red: '#dc2626', // alerts/warnings
          yellow: '#fbbf24', // notifications
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 