/** @jsx jsx */
import { jsx } from 'theme-ui';

export const Container = props => (
  <div
    {...props}
    sx={{
      mx: 'auto',
      px: 3,
      maxWidth: ['100%', '40em', '52em', '64em', '72em'],
    }}
  />
);
