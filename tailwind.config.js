/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FED143',
          hover: '#FDC935',
          light: '#FEE6A0',
          dark: '#E6BC3D',
        },
        secondary: {
          DEFAULT: '#FEE287',
          hover: '#4B5563',
        },
        tertiary: {
          DEFAULT: '#E7BE3D',
        }
      }
    },
  },
  plugins: [],
}