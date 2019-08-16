/** @jsx jsx */
import { Styled, jsx } from 'theme-ui';
import { keyframes } from '@emotion/core';

const expand = keyframes`
from {
  width: 0;
}

to {
    width: 100%;
}
`;

export const ProgressBar = ({ duration = 1000, ...props }) => {
  return (
    <Styled.div
      sx={{
        width: '100%',
      }}
      {...props}
    >
      <Styled.div
        sx={{
          height: 8,
          backgroundColor: 'secondary',
        }}
        css={{
          animation: `${expand} ${duration}ms linear`,
        }}
      >
        &nbsp;
      </Styled.div>
    </Styled.div>
  );
};
