/** @jsx jsx */
import { jsx } from 'theme-ui';

export const Aside = (props) => (
  <aside
    {...props}
    sx={{
      borderRadius: 5,
      borderLeft: '4px solid',
      borderColor: 'accent',
      bg: 'accentLight',
      pl: 3,
      pr: 4,
      py: 2,
      textAlign: 'justify',
    }}
  />
);
