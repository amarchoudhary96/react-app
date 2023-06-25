/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        "sm": '640px',
        "md": '768px',
        "lg": '1024px',
        "xl": '1280px',
      },
      colors: {
        white: '#ffffff',
        black: '#000000',
      },
    },
  },
  plugins: [],
};
