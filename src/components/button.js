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
        boxShadow: `0px 1px 5px 0px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)`,
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
