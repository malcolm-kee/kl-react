/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

export const NavLink = props => (
  <Styled.a
    {...props}
    sx={{
      diplay: 'inline-block',
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      flex: 'none',
      px: 3,
      py: 2,
    }}
  />
);
