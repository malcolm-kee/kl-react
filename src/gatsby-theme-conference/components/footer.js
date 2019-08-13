/** @jsx jsx */
import { Link } from 'gatsby';
import { Container, Flex, jsx, Styled } from 'theme-ui';
import List from 'gatsby-theme-conference/src/components/list';
import NavLink from 'gatsby-theme-conference/src/components/nav-link';
import { currentYear } from '../../lib';

export default function Footer() {
  return (
    <Container>
      <Flex
        sx={{
          mx: -3,
          flexWrap: 'wrap'
        }}
      >
        <div sx={{ width: ['100%', 100 / 3 + '%'] }}>
          <List>
            <li>
              <NavLink as={Link} to="/speakers">
                Speakers
              </NavLink>
            </li>
          </List>
        </div>
        <div sx={{ width: ['100%', 100 / 3 + '%'] }}>
          <List>
            <li>
              <NavLink as="a" href="https://www.meetup.com/kl-react/?action=join">
                Join Us
              </NavLink>
            </li>
            <li>
              <NavLink as={Link} to="/code-of-conduct">
                Code of Conduct
              </NavLink>
            </li>
          </List>
        </div>
      </Flex>
      <div>
        <Styled.p
          sx={{
            textAlign: 'right',
            fontSize: 0
          }}
        >
          © {currentYear} KL React
        </Styled.p>
      </div>
    </Container>
  );
}
