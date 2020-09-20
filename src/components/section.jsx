import cx from 'classnames';
import * as React from 'react';
import { Container } from './container';

export const Section = ({
  title,
  description,
  children,
  className,
  ...props
}) => {
  return (
    <Container className={cx('lg:grid lg:grid-cols-4', className)} {...props}>
      <div className="space-y-5 sm:space-y-4 pb-4">
        {title && (
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h2>
        )}
        {description}
      </div>
      <div className="lg:col-span-3">{children}</div>
    </Container>
  );
};
