const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: defaultTheme.colors.teal,
      },
    },
    typography: {
      default: {
        css: {
          a: {
            color: defaultTheme.colors.teal[700],
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  },
  variants: {
    zIndex: ({ after }) => after(['hover']),
    margin: ({ after }) => after(['group-hover']),
  },
  plugins: [require('@tailwindcss/ui')],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
