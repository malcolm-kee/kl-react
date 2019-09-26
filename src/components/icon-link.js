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
      boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)`,
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        color: 'primary',
        boxShadow: `0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)`,
      },
      '& > svg': {
        display: 'inline-block',
        verticalAlign: 'middle',
      },
    }}
  />
);
