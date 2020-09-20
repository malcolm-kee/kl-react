import * as React from 'react';
import cx from 'classnames';
import { Footer } from './footer';
import { Header } from './header';

export const Layout = ({ children, hideHeader, className }) => (
  <>
    {!hideHeader && <Header />}
    <main className={cx(className, !hideHeader && 'py-10')}>{children}</main>
    <Footer />
  </>
);
