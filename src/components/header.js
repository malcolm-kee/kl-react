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
    <header
      className={cx(
        !flat && 'bg-white border-b border-gray-200 xl:sticky xl:top-0 xl:z-50'
      )}
    >
      <Container>
        <div className="flex sm:justify-between">
          <div className="flex flex-1 justify-between sm:justify-start">
            <NLink
              className="text-xl h-16 font-bold px-1 flex-shrink-0 rounded text-primary-500 focus:shadow-outline-teal"
              to="/"
              innerClass="inline-flex items-center"
            >
              <Icon className="mr-2 inline-block" />
              <span className="hidden sm:inline-block">{title}</span>
            </NLink>
            <div className="flex flex-wrap justify-end space-x-2 sm:justify-start sm:-my-px sm:ml-6 sm:space-x-6">
              <HeaderLink to="/events">Events</HeaderLink>
              <HeaderLink to="/speakers">Speakers</HeaderLink>
              <HeaderLink to="/talks">Talks</HeaderLink>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <NButton
              as={NLink}
              to="/submit-a-talk"
              className={cx(flat && 'relative')}
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
    className="px-3 py-3 sm:pt-1 sm:pb-0 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out"
    to={to}
    activeClassName="border-primary-500"
  >
    {children}
  </NLink>
);
