/** @jsx jsx */
import { graphql } from 'gatsby';
import {
  FiBookOpen as BookOpen,
  FiExternalLink as ExternalLink,
} from 'react-icons/fi';
import { jsx, Styled } from 'theme-ui';
import { Container } from './container';
import { Link } from './link';

export const MeetupOverview = ({ name, dateTime, venueName, link, info }) => (
  <div
    id="meetup-overview"
    sx={{
      py: 6,
    }}
  >
    <Container>
      <Styled.h1 sx={{ color: 'secondary', mb: 4 }}>{name}</Styled.h1>
      <Styled.p sx={{ my: 1, fontSize: [3, 4] }}>{dateTime}</Styled.p>
      <Styled.p
        sx={{
          fontSize: [3, 4],
        }}
      >
        @{venueName}{' '}
      </Styled.p>
      <Styled.p sx={{ display: 'flex', alignItems: 'center' }}>
        <Link
          to={link}
          isExternal
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            mr: 4,
            opacity: 0.9,
          }}
        >
          Meetup.com
          <ExternalLink sx={{ mx: 2 }} />
        </Link>
        {info && info.site && (
          <Link
            to={info.site}
            isExternal
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              opacity: 0.9,
            }}
          >
            Material
            <BookOpen sx={{ mx: 2 }} />
          </Link>
        )}
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
    info {
      site
    }
  }
`;
