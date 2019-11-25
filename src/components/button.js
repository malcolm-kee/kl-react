/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

export const Button = ({ children, disabled, className, ...props }) => (
  <Styled.a
    sx={{
      cursor: disabled ? 'default' : 'pointer',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      display: 'inline-block',
      flex: 'none',
      fontWeight: 'bold',
      border: 0,
      p: 0,
      borderRadius: 4,
      color: disabled ? 'text' : 'background',
      bg: disabled ? 'background' : 'primary',
      ':focus': {
        outline: 'none',
      },
      ':focus > span': {
        borderColor: `currentColor`,
        boxShadow: theme => `0 0 0 3px ${theme.colors.primary}`,
      },
      '&:hover': disabled
        ? {
            color: 'text',
          }
        : {
            color: 'background',
            bg: 'secondary',
          },
    }}
    tabIndex={0}
    {...props}
  >
    <span
      sx={{
        display: 'inline-block',
        p: theme => theme.space[3] - 3,
        m: 0,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: 'transparent',
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
