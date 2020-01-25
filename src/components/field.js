/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

export function Field({
  label,
  name,
  id = name,
  helpText,
  InputComponent = 'input',
  required,
  ...props
}) {
  return (
    <Styled.div
      sx={{
        position: 'relative',
        my: 4,
      }}
    >
      {label && (
        <label
          sx={{
            display: 'block',
            fontSize: [2, 3],
            color: 'textLight',
          }}
          htmlFor={id}
        >
          {label}
          {required && <span sx={{ color: 'red' }}> *</span>}
        </label>
      )}
      {helpText && (
        <small
          sx={{
            fontSize: 1,
            fontStyle: 'italic',
          }}
          id={`help-${id}`}
        >
          {helpText}
        </small>
      )}
      <InputComponent
        id={id}
        name={name}
        required={required}
        aria-describedby={helpText ? `help-${id}` : undefined}
        sx={{
          display: 'block',
          width: '100%',
          fontFamily: 'inherit',
          fontSize: [2, 3, 3],
          color: 'text',
          outline: 'none',
          bg: 'background',
          border: 0,
          m: 0,
          p: `6px 0 7px`,
          borderBottom: `1px solid transparent`,
          borderBottomColor: `#ccc`,
          '&:focus': {
            outline: 'none',
            borderBottomColor: 'transparent',
          },
          '~ span': {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `2px`,
            backgroundColor: 'primary',
            transformOrigin: `bottom right`,
            transform: `scaleX(0)`,
            transition: `transform 0.5s ease`,
          },
          '&:focus ~ span': {
            transformOrigin: `bottom left`,
            transform: `scaleX(1)`,
          },
        }}
        {...props}
      />
      <span />
    </Styled.div>
  );
}
