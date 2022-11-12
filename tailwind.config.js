/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary' : '#3490dc',
    })
  },
  extend: {},
  plugins: [],
}
