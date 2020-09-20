/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import cx from 'classnames';

export const NButton = ({
  as: Component = 'button',
  type = Component === 'button' ? 'button' : undefined,
  size,
  className,
  children,
  ...buttonProps
}) => (
  <Component
    type={type}
    className={cx(
      'inline-flex items-center border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:shadow-outline-teal active:bg-primary-700 transition ease-in-out duration-150',
      size === 'large' ? 'px-8 py-3 md:py-4 md:text-lg md:px-10' : 'px-4 py-2',
      className
    )}
    {...buttonProps}
  >
    {children}
  </Component>
);

export const Button = ({
  children,
  disabled,
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
        boxShadow: (theme) => `0 0 0 3px ${theme.colors.primary}`,
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
        p: (theme) => theme.space[3] - 3,
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
