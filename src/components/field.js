/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

export function Field({
  label,
  name,
  id = name,
  helpText,
  required,
  children,
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
      {children}
    </Styled.div>
  );
}
