const heading = {
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading',
  m: 0,
};

const colors = {
  text: 'rgba(0, 0, 0, 0.87)',
  background: '#f8f8f8',
  primary: '#33e',
  secondary: '#11a',
  accent: '#61dafb',
  muted: '#9e9e9e',
  modes: {
    dark: {
      text: 'hsl(210,50%,96% )',
      background: '#212121',
      primary: '#0fd7ba',
      secondary: '#40AF9F',
      accent: '#E89E56',
      muted: 'hsla(230,20%,0%,20% )',
    },
  },
};

export default {
  breakpoints: ['40em', '52em', '64em'],
  colors,
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  styles: {
    h1: {
      ...heading,
      fontSize: [5, 6, 7],
    },
    h2: {
      ...heading,
      pb: [3],
      fontSize: [5, 6],
    },
    h3: {
      ...heading,
      fontSize: [4],
    },
    h4: {
      ...heading,
    },
    h5: {
      ...heading,
    },
    h6: {
      ...heading,
    },
    p: {
      mt: 0,
      mb: 4,
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
      '&:hover': {
        color: 'secondary',
      },
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 3px currentColor`,
        '&:not(:focus-visible)': {
          boxShadow: 'none',
        },
      },
    },
  },
};
