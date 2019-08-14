/** @jsx jsx */
import Button from 'gatsby-theme-conference/src/components/button';
import useSiteMetadata from 'gatsby-theme-conference/src/use-site-metadata';
import IconLink from 'gatsby-theme-conference/src/components/icon-link';
import { Container, jsx, Styled } from 'theme-ui';
import { Navigation2 } from 'react-feather';

export default function Banner({ upcomingEvent, ...props }) {
  const { title, description } = useSiteMetadata();

  return (
    <div
      {...props}
      sx={{
        py: [5, 6],
      }}
    >
      <Container>
        <Styled.h1
          sx={{
            fontSize: [5, 6, 7],
            m: 0,
            color: 'secondary',
          }}
        >
          {upcomingEvent ? upcomingEvent.name : title}
        </Styled.h1>
        <Styled.p
          sx={{
            fontSize: [3, 4, 5],
            mb: 5,
          }}
        >
          {upcomingEvent
            ? `${upcomingEvent.time}@${upcomingEvent.venue.name}`
            : description}
        </Styled.p>
        <div sx={{ display: 'flex' }}>
          {upcomingEvent ? (
            <Button href={upcomingEvent.link}>
              RSVP {upcomingEvent.isFull && '(Waitlist)'}
            </Button>
          ) : (
            <Button href="#cta">Join Meetup</Button>
          )}
          {upcomingEvent && (
            <IconLink sx={{ p: 3, mx: 3 }} href={upcomingEvent.venue.mapURL}>
              Getting There <Navigation2 />
            </IconLink>
          )}
        </div>
      </Container>
    </div>
  );
}
