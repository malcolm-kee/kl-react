/** @jsx jsx */
import Button from 'gatsby-theme-conference/src/components/button';
import useSiteMetadata from 'gatsby-theme-conference/src/use-site-metadata';
import { Container, jsx, Styled } from 'theme-ui';

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
          }}
        >
          {upcomingEvent ? upcomingEvent.name : title}
        </Styled.h1>
        <Styled.p
          sx={{
            fontSize: 3,
            mb: 5,
          }}
        >
          {upcomingEvent ? `@${upcomingEvent.venue.name}` : description}
        </Styled.p>
        <div sx={{ display: 'flex' }} />
        {upcomingEvent ? (
          <Button href={upcomingEvent.link}>RSVP</Button>
        ) : (
          <Button href="#cta">Join Meetup</Button>
        )}
      </Container>
    </div>
  );
}
