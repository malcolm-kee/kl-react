/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

export const NumberedList = props => (
  <Styled.ol
    {...props}
    sx={{
      p: 0,
      pl: 3,
    }}
  />
);
