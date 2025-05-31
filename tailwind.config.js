/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EA1D2C",
        secondary: "#2D2D2D",
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        'poppins': ['var(--font-poppins)', 'sans-serif'], // Corrigido aqui
      },
    },
  },
  plugins: [],
} 