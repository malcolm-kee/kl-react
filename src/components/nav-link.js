/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

export const NavLink = ({
  children,
  className,
  href,
  target = href && href[0] !== '/' ? '_BLANK' : undefined,
  rel = target === '_BLANK' ? 'noopener noreferrer' : undefined,
  ...props
}) => (
  <Styled.a
    href={href}
    target={target}
    rel={rel}
    sx={{
      display: 'inline-flex',
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      flex: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      '&[aria-current]': {
        color: 'primary',
      },
      // all these focus style is to achieve the goal of showing focus ring
      // when user navigate with keyboard, else don't show it
      ':focus': {
        outline: 'none',
      },
      ':focus > span': {
        boxShadow: `0 0 0 3px currentColor`,
      },
    }}
    tabIndex={0}
    {...props}
  >
    <span
      sx={{
        position: 'relative',
        display: 'inline-block',
        px: 3,
        py: 2,
        ':focus': {
          outline: 'none',
        },
      }}
      className={className}
      tabIndex={-1}
    >
      {children}
    </span>
  </Styled.a>
);
