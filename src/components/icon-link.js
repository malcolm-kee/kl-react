/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

export const IconLink = ({ to, href = to, ...props }) => (
  <Styled.a
    href={href}
    target="_BLANK"
    rel="noopener noreferrer"
    {...props}
    sx={{
      display: 'inline-block',
      p: 2,
      borderRadius: 8,
      color: 'textLight',
      textDecoration: 'none',
      '&:hover': {
        color: 'primary',
      },
      '& > svg': {
        display: 'inline-block',
        verticalAlign: 'middle',
      },
    }}
  />
);
