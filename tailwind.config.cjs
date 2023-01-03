/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    require('path').join(require.resolve('@skeletonlabs/skeleton'),'./src/**/*.{html,js,svelte,ts}')
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          950: '#500b20',
        },
      }
    },
  },
  plugins: [
    require('@skeletonlabs/skeleton/tailwind/theme.cjs'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
