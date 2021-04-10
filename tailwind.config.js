const teal = {
  100: '#E6FFFA',
  200: '#B2F5EA',
  300: '#81E6D9',
  400: '#4FD1C5',
  500: '#38B2AC',
  600: '#319795',
  700: '#2C7A7B',
  800: '#285E61',
  900: '#234E52',
};

module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: teal,
      },
      typography: {
        default: {
          css: {
            a: {
              color: teal[700],
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      zIndex: ['hover'],
      margin: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
