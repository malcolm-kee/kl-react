/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

export const List = props => (
  <Styled.ul
    {...props}
    sx={{
      listStyle: 'none',
      p: 0,
    }}
  />
);
