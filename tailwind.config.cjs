/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      keyframes:{
        'move-t':{
          'from':{top:'700px'},
          'to':{top:'0'},
        },
      }
    },
  },
  plugins: [],
}
