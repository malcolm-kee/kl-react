/** @jsx jsx */
import { Link } from 'gatsby';
import { jsx, useColorMode } from 'theme-ui';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { Button } from './button';
import { DesktopOnly } from './desktop-only';
import { NavLink } from './nav-link';
import { Icon } from './icon';
// eslint-disable-next-line
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export function Header() {
  const { title } = useSiteMetadata();
  const [colorMode, setColorMode] = useColorMode();

  return (
    <>
      <NavLink
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
        }}
        css={theme => ({
          [`@media screen and (max-width: ${theme.breakpoints[0]})`]: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        })}
        as={Link}
        to="/"
      >
        <Icon
          sx={{
            mr: 2,
            my: -2,
          }}
        />
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
        <NavLink as={Link} to="/talks">
          Talks
        </NavLink>
      </DesktopOnly>
      <Button as={Link} to="/submit-a-talk" sx={{ ml: 2 }}>
        Submit a Talk
      </Button>
      <NavLink
        onClick={e => {
          setColorMode(colorMode === 'default' ? 'dark' : 'default')
        }}>
        {colorMode === 'default' ? <FaMoon /> : <FaSun />}
      </NavLink>
    </>
  );
}
