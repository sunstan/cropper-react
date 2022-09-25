/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 2s linear infinite',
        dash: 'dash 1.5s ease-in-out infinite'
      },
      keyframes: {
        rotate: {
          '100%': {
            transform: 'rotate(360deg)',
          }
        },
        dash: {
          '0%': {
            strokeDasharray: '1, 200',
            strokeDashoffset: '0',
          },
          '50%': {
            strokeDasharray: '89, 200',
            strokeDashoffset: '-35px',
          },
          '100%': {
            strokeDasharray: '89, 200',
            strokeDashoffset: '-124px',
          }
        }
      },
    },
  },
  plugins: [],
}
