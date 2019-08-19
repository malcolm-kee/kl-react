/** @jsx jsx */
import { jsx } from 'theme-ui';

export const Aside = props => (
  <aside
    {...props}
    sx={{
      bg: '#ddd',
      borderRadius: 4,
      px: 2,
      py: 1,
      '> :last-child': {
        mb: 0,
      },
    }}
  />
);
