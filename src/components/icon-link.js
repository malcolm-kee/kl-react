import cx from 'classnames';
import * as React from 'react';

export const IconLink = ({ to, href = to, children, className, ...props }) => (
  <a
    href={href}
    target="_BLANK"
    rel="noopener noreferrer"
    {...props}
    className={cx(
      'inline-block p-2 rounded-full text-gray-500 hover:text-primary-500 focus:outline-none focus:shadow-outline-teal',
      className
    )}
  >
    {children}
  </a>
);
