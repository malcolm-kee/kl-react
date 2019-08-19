/** @jsx jsx */
import { Styled, jsx } from 'theme-ui';

export const Button = ({ disabled, ...props }) => (
  <Styled.a
    {...props}
    sx={{
      cursor: disabled ? 'default' : 'pointer',
      display: 'inline-block',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      flex: 'none',
      fontWeight: 'bold',
      px: 3,
      py: 3,
      border: 0,
      color: disabled ? 'text' : 'background',
      bg: disabled ? 'background' : 'primary',
      borderRadius: 4,
      '&:hover': disabled
        ? {
            color: 'text',
          }
        : {
            color: 'background',
            bg: 'secondary',
          },
    }}
  />
);

export default Button;
