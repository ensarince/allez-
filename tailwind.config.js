/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
      './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
     /*   'green3': '#6A2C70',
        'green2': '#B83B5E',
        'green1' : '#F08A5D',
        'white1': "#F9ED69",

         'green3': '#222831',
        'green2': '#393E46',
        'green1' : '#00ADB5',
        'white1': "#EEEEEE",  

        'white1' : "#F0EBE3",
        'green1' : "#E4DCCF",
        'green2': "#7D9D9C",
        "green3": "#576F72",*/

        'white1' : "#F4F4F2",
        'green1' : "#E8E8E8",
        'green2': "#BBBFCA",
        "green3": "#495464",
      },

      width: {
        '15': '300px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    require('tw-elements/dist/plugin')
  ],
}
