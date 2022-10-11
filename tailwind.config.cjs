/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        rose: {
          950: '#500b20',
        },
      }
    },
  },
  plugins: [],
}
