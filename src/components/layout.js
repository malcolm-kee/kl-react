/** @jsx jsx */
import { Global } from '@emotion/core';
import { jsx } from 'theme-ui';
import { Footer } from './footer';
import { Header } from './header';

export const Layout = props => (
  <div
    {...props}
    sx={{
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
      bg: 'background',
    }}
  >
    <Global
      styles={{
        '*': { boxSizing: 'border-box' },
        body: { margin: 0 },
        textarea: {
          resize: 'vertical',
        },
      }}
    />
    <Header />
    <main>{props.children}</main>
    <Footer />
  </div>
);
