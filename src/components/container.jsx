import * as React from 'react';
import cx from 'classnames';

export const Container = ({ className, ...props }) => (
  <div
    className={cx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}
    {...props}
  />
);
