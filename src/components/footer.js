/** @jsx jsx */
import { Link } from 'gatsby';
import { Container, Flex, jsx } from 'theme-ui';
import { useLastBuild } from '../hooks/use-last-build';
import { currentYear } from '../lib';
import { List } from './list';
import { NavLink } from './nav-link';

export function Footer() {
  const lastBuild = useLastBuild();

  return (
    <Container sx={{ py: 1 }}>
      <Flex
        sx={{
          mx: -3,
          flexWrap: 'wrap',
        }}
      >
        <div sx={{ width: ['100%', 100 / 3 + '%'] }}>
          <List sx={{ my: [3, 1] }}>
            <li sx={{ my: -2 }}>
              <NavLink as={Link} to="/events">
                Events
              </NavLink>
            </li>
            <li sx={{ my: -2 }}>
              <NavLink as={Link} to="/speakers">
                Speakers
              </NavLink>
            </li>
            <li sx={{ my: -2 }}>
              <NavLink as={Link} to="/talks">
                Talks
              </NavLink>
            </li>
            <li sx={{ my: -2 }}>
              <NavLink as={Link} to="/react-clinic">
                React Clinic
              </NavLink>
            </li>
            <li sx={{ my: -2 }}>
              <NavLink as={Link} to="/react-on-twitter">
                Nothing here
              </NavLink>
            </li>
          </List>
        </div>
        <div sx={{ width: ['100%', 100 / 3 + '%'] }}>
          <List sx={{ my: [3, 1] }}>
            <li sx={{ my: -2 }}>
              <NavLink as={Link} to="/submit-a-talk">
                Submit A Talk
              </NavLink>
            </li>
            <li sx={{ my: -2 }}>
              <NavLink as={Link} to="/submit-topic">
                Submit Topic
              </NavLink>
            </li>
            <li sx={{ my: -2 }}>
              <NavLink as={Link} to="/contributing">
                Contributing
              </NavLink>
            </li>
          </List>
        </div>
        <div sx={{ width: ['100%', 100 / 3 + '%'] }}>
          <List sx={{ my: [3, 1] }}>
            <li sx={{ my: -2 }}>
              <NavLink as={Link} to="/code-of-conduct">
                Code of Conduct
              </NavLink>
            </li>
            <li sx={{ my: -2 }}>
              <NavLink as="a" href="https://github.com/malcolm-kee/kl-react">
                GitHub
              </NavLink>
            </li>
            <li sx={{ my: -2 }}>
              <NavLink as="a" href="https://fb.me/klreact">
                Facebook
              </NavLink>
            </li>
            <li sx={{ my: -2 }}>
              <NavLink as="a" href="https://www.meetup.com/kl-react">
                Meetup
              </NavLink>
            </li>
          </List>
        </div>
      </Flex>
      <Flex
        sx={{
          justifyContent: 'space-between',
          my: 4,
        }}
      >
        <small>Last build on {lastBuild}.</small>
        <small
          sx={{
            textAlign: 'right',
          }}
        >
          © {currentYear} KL React
        </small>
      </Flex>
    </Container>
  );
}
