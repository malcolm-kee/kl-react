import cx from 'classnames';
import * as React from 'react';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { NButton } from './button';
import { Icon } from './icon';
import { NLink } from './nav-link';
import { Container } from './container';

export function Header({ flat }) {
  const { title } = useSiteMetadata();

  return (
    <header className={cx(!flat && 'bg-white border-b border-gray-200')}>
      <Container>
        <div className="flex justify-between h-16">
          <div className="flex">
            <NLink
              className="text-xl font-bold text-primary-500 focus:shadow-outline-teal px-1 rounded"
              to="/"
              innerClass="inline-flex items-center"
            >
              <Icon className="mr-2 h-12 inline-block" />
              {title}
            </NLink>
            <div className="hidden sm:-my-px sm:ml-6 space-x-8 sm:flex">
              <HeaderLink to="/events">Events</HeaderLink>
              <HeaderLink to="/speakers">Speakers</HeaderLink>
              <HeaderLink to="/talks">Talks</HeaderLink>
            </div>
          </div>
          <div className="flex items-center">
            <NButton
              as={NLink}
              to="/submit-a-talk"
              className={cx('hidden sm:inline-flex', flat && 'relative')}
            >
              Submit a Talk
            </NButton>
          </div>
        </div>
      </Container>
    </header>
  );
}

const HeaderLink = ({ to, children }) => (
  <NLink
    className="px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-900 focus:border-primary-700 transition duration-150 ease-in-out"
    to={to}
    activeClassName="border-primary-500"
  >
    {children}
  </NLink>
);
