/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Rubik','sans-serif'],
      },
      'colors':{
        'primary-blue':'hsl(238, 40%, 52%)',
        'neutral-blue':'hsl(212, 24%, 26%)',
        'neutral-graylish':'hsl(211, 10%, 45%)',
        'light-blue':'hsl(239, 57%, 85%)',
        'light-gray': 'hsl(223, 19%, 93%)',
        'color5':'hsla(0, 0%, 0%, .48);',
      }
    },
  },
  plugins: [],
}

