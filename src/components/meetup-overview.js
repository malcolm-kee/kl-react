/** @jsx jsx */
import { graphql } from 'gatsby';
import { ExternalLink } from 'react-feather';
import { Container, jsx, Styled } from 'theme-ui';
import { Link } from './link';

export const MeetupOverview = ({ name, dateTime, venueName, link }) => (
  <div id="meetup-overview">
    <Container>
      <Styled.h2 sx={{ color: 'secondary' }}>{name}</Styled.h2>
      <Styled.p sx={{ my: 1, fontSize: [3, 4, 5] }}>{dateTime}</Styled.p>
      <Styled.p
        sx={{
          fontSize: [3, 4, 5],
        }}
      >
        @{venueName}{' '}
      </Styled.p>
      <Styled.p>
        <Link
          to={link}
          isExternal
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          Meetup.com
          <ExternalLink sx={{ mx: 1 }} />
        </Link>
      </Styled.p>
    </Container>
  </div>
);

export const query = graphql`
  fragment MeetupOverview on MeetupEvent {
    name
    link
    status
    isFull
    dateTime(formatString: "ddd, DD MMM YYYY h:mm A")
    mapURL
    venueName
  }
`;
