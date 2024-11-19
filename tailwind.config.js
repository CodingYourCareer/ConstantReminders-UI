/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './template/pages/**/*.{js,ts,vue}', // Pages inside 'template'
    './template/components/**/*.{js,ts,vue}', // Components inside 'template'
    './template/layouts/**/*.{js,ts,vue}', // Layouts inside 'template'
    './template/nuxt.config.{js,ts}', // Nuxt config file inside 'template'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


