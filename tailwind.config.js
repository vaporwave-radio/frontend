module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        win95: ['"MS Sans Serif"', 'sans-serif'],
      },
      colors: {
        winbg: '#c0c0c0',
        winborder: '#808080',
        winhighlight: '#ffffff',
        windark: '#000000',
      }
    },
  },
  plugins: [],
}

