import cx from 'classnames';
import * as React from 'react';

export type BadgeProps = React.ComponentPropsWithoutRef<'span'> & {
  color: 'indigo' | 'pink' | 'green' | 'gray' | 'primary' | 'teal';
};

export const Badge = ({ color, className, ...badgeProps }: BadgeProps) => {
  return (
    <span
      className={cx(
        'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5',
        classForColor[color],
        className
      )}
      {...badgeProps}
    />
  );
};

const classForColor: Record<BadgeProps['color'], string> = {
  indigo: 'bg-indigo-100 text-indigo-800',
  gray: 'bg-gray-100 text-gray-800',
  pink: 'bg-pink-100 text-pink-800',
  primary: 'bg-primary-100 text-primary-800',
  green: 'bg-green-100 text-green-800',
  teal: 'bg-teal-100 text-teal-800',
};
