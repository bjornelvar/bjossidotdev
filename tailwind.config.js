module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FCF5FF',
        light: '#FFFFFF',
        dark: '#161616',
        'placeholder-light': '#F0F0F0',
        'placeholder-dark': '#303030',
      },
      borderColor: {
        light: '#F0F0F0',
        dark: '#303030',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
