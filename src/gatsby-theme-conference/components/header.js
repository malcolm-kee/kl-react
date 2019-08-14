/** @jsx jsx */
import { Link } from 'gatsby';
import Button from 'gatsby-theme-conference/src/components/button';
import DesktopOnly from 'gatsby-theme-conference/src/components/desktop-only';
import NavLink from 'gatsby-theme-conference/src/components/nav-link';
import useSiteMetadata from 'gatsby-theme-conference/src/use-site-metadata';
import { jsx } from 'theme-ui';
// eslint-disable-next-line
import React from 'react';

export default function Header() {
  const { title } = useSiteMetadata();

  return (
    <>
      <NavLink as={Link} to="/">
        {title}
      </NavLink>
      <div sx={{ mx: 'auto' }} />
      <DesktopOnly>
        <NavLink as={Link} to="/events">
          Events
        </NavLink>
        <NavLink as={Link} to="/speakers">
          Speakers
        </NavLink>
      </DesktopOnly>
      <Button as={Link} to="/#cta">
        Join Meetup
      </Button>
    </>
  );
}
