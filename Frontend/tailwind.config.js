module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust to your project
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '780px',
      },
    },
  },
}