/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

export const SectionHeading = props => (
  <Styled.h2
    {...props}
    sx={{
      textAlign: 'center',
    }}
  />
);
