import React from 'react';
import { jsx } from 'theme-ui';

export const DesktopOnly = props => {
  const children = React.Children.toArray(props.children).map((child, i) => {
    return jsx(child.type, {
      key: i,
      ...child.props,
      css: theme => ({
        [`@media screen and (max-width: ${theme.breakpoints[1]})`]: {
          display: 'none',
          padding: 0,
          margin: 0,
        },
      }),
    });
  });

  return <>{children}</>;
};
