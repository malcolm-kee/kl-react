/** @jsx jsx */
import { jsx } from 'theme-ui';

export const Aside = props => (
  <aside
    {...props}
    sx={{
      bg: '#eee',
      borderRadius: 4,
      px: 3,
      py: 2,
      textAlign: 'justify',
      '> :last-child': {
        mb: 0,
      },
    }}
  />
);
