import cx from 'classnames';
import * as React from 'react';

export const Article = (props) => (
  <article
    {...props}
    className={cx('prose max-w-2xl px-2 sm:px-4 mx-auto', props.className)}
  />
);
