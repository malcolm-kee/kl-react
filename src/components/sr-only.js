/** @jsx jsx */
import { jsx } from 'theme-ui';

/**
 * Wrap text visible to screen reader only
 */
export const SrOnly = props => (
  <span
    sx={{
      '&:not(:focus):not(:active)': {
        // Source: https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(100%)',
        height: '1px',
        overflow: 'hidden',
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: '1px',
      },
    }}
    {...props}
  />
);
