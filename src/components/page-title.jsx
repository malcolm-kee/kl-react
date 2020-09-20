import cx from 'classnames';
import * as React from 'react';

export const PageTitle = (props) => (
  <h1
    {...props}
    className={cx(
      'text-3xl font-bold leading-tight text-gray-900 mb-4',
      props.className
    )}
  />
);
