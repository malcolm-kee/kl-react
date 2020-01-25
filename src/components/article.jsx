/** @jsx jsx */
import { jsx } from 'theme-ui';

export const Article = props => (
  <article
    {...props}
    sx={{
      mx: 'auto',
      px: 3,
      maxWidth: ['72ch'],
    }}
  />
);
