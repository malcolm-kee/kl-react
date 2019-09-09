/** @jsx jsx */
import { Link } from 'gatsby';
import { Container, Flex, jsx, Styled } from 'theme-ui';
import { currentYear } from '../lib';
import { List } from './list';
import { NavLink } from './nav-link';

export function Footer() {
  return (
    <Container sx={{ py: 1 }}>
      <Flex
        sx={{
          mx: -3,
          flexWrap: 'wrap',
        }}
      >
        <div sx={{ width: ['100%', 100 / 3 + '%'] }}>
          <List sx={{ my: [2, 1] }}>
            <li>
              <NavLink as={Link} to="/events">
                Events
              </NavLink>
            </li>
            <li>
              <NavLink as={Link} to="/speakers">
                Speakers
              </NavLink>
            </li>
            <li>
              <NavLink as={Link} to="/talks">
                Talks
              </NavLink>
            </li>
            <li>
              <NavLink as={Link} to="/react-clinic">
                React Clinic
              </NavLink>
            </li>
            <li>
              <NavLink as={Link} to="/react-on-twitter">
                Nothing here
              </NavLink>
            </li>
          </List>
        </div>
        <div sx={{ width: ['100%', 100 / 3 + '%'] }}>
          <List sx={{ my: [2, 1] }}>
            <li>
              <NavLink as={Link} to="/submit-a-talk">
                Submit A Talk
              </NavLink>
            </li>
            <li>
              <NavLink as={Link} to="/submit-topic">
                Submit Topic
              </NavLink>
            </li>
            <li>
              <NavLink as={Link} to="/contributing">
                Contributing
              </NavLink>
            </li>
          </List>
        </div>
        <div sx={{ width: ['100%', 100 / 3 + '%'] }}>
          <List sx={{ my: [2, 1] }}>
            <li>
              <NavLink as={Link} to="/code-of-conduct">
                Code of Conduct
              </NavLink>
            </li>
            <li>
              <NavLink as="a" href="https://github.com/malcolm-kee/kl-react">
                GitHub
              </NavLink>
            </li>
            <li>
              <NavLink as="a" href="https://www.meetup.com/kl-react">
                Meetup
              </NavLink>
            </li>
          </List>
        </div>
      </Flex>
      <div>
        <Styled.p
          sx={{
            textAlign: 'right',
            fontSize: 0,
          }}
        >
          © {currentYear} KL React
        </Styled.p>
      </div>
    </Container>
  );
}
