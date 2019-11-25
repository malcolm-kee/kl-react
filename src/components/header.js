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
import { Sun, Moon } from 'react-feather';

export function Header() {
  const { title } = useSiteMetadata();
  const [colorMode, setColorMode] = useColorMode();

  const isDark = () => colorMode === 'dark';

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
      <Button
        as={Link}
        to="/submit-a-talk"
        sx={{ display: ['none', 'inline-block'] }}
      >
        Submit a Talk
      </Button>
      <button
        sx={{
          cursor: 'pointer',
          background: 'transparent',
          margin: '0 10px',
          color: 'text',
          border: 0,
          ':focus': {
            outline: 'none',
          },
          ':focus > span': {
            boxShadow: `0 0 0 2px currentColor`,
          },
        }}
        tabIndex={0}
        aria-label={isDark() ? `Activate light mode` : `Activate dark mode`}
        onClick={e => {
          setColorMode(colorMode === 'default' ? 'dark' : 'default');
        }}
      >
        <span
          sx={{
            p: '6px',
            width: 36,
            height: 36,
            borderRadius: '50%',
            display: 'inline-block',
            ':focus': {
              outline: 'none',
            },
          }}
          tabIndex={-1}
        >
          {colorMode === 'default' ? <Moon /> : <Sun />}
        </span>
      </button>
    </>
  );
}
