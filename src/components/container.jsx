/** @jsx jsx */
import { jsx } from 'theme-ui';

export const Container = ({ py, ...props }) => (
  <div
    {...props}
    sx={{
      mx: 'auto',
      px: 3,
      py,
      maxWidth: ['100%', '40em', '52em', '64em', '72em'],
    }}
  />
);
