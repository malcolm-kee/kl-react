/** @jsx jsx */
import { jsx } from 'theme-ui';
import cx from 'classnames';
import { keyframes } from '@emotion/react';

const expand = keyframes`
from {
  width: 0;
}

to {
    width: 100%;
}
`;

export const ProgressBar = ({ duration = 1000, className, ...props }) => {
  return (
    <div className={cx('w-full', className)} {...props}>
      <div
        className="bg-primary-500 h-2"
        css={{
          animation: `${expand} ${duration}ms linear`,
        }}
      >
        &nbsp;
      </div>
    </div>
  );
};
