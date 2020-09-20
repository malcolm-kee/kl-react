import { Link as GatsbyLink } from 'gatsby';
import * as React from 'react';

export const Link = ({
  to,
  target = to && to[0] !== '/' ? '_BLANK' : undefined,
  rel = target === '_BLANK' ? 'noopener noreferrer' : undefined,
  ...props
}) => {
  const isExternal = to && to[0] !== '/';
  const Component = isExternal ? 'a' : GatsbyLink;
  const appliedProps = isExternal
    ? {
        href: to,
        target,
        rel,
      }
    : {
        to,
      };

  return <Component {...appliedProps} {...props} />;
};
