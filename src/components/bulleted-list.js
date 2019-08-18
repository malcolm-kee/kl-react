/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

export const BulletedList = props => (
  <Styled.ul
    {...props}
    sx={{
      listStyle: 'disc',
      p: 0,
      pl: 3,
    }}
  />
);
