/** @jsx jsx */
import { Map, Navigation2 } from 'react-feather';
import { jsx, Styled } from 'theme-ui';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { Button } from './button';
import { Container } from './container';
import { IconLink } from './icon-link';

export function Banner({ upcomingEvent, ...props }) {
  const { title, description } = useSiteMetadata();

  return (
    <div
      {...props}
      sx={{
        py: [5, 6],
      }}
    >
      <Container
        sx={{
          py: 3,
        }}
      >
        <Styled.h1
          sx={{
            m: 0,
            color: 'secondary',
          }}
        >
          {upcomingEvent ? upcomingEvent.name : title}
        </Styled.h1>
        {upcomingEvent && (
          <Styled.p sx={{ my: 1, fontSize: [3, 4, 5] }}>
            {upcomingEvent.dateTime}
          </Styled.p>
        )}
        <Styled.p
          sx={{
            fontSize: [3, 4, 5],
            mb: 5,
          }}
        >
          {upcomingEvent
            ? upcomingEvent.venue.name
              ? `@${upcomingEvent.venue.name}`
              : '(Needs a location)'
            : description}
        </Styled.p>
        <div sx={{ display: 'flex' }}>
          {upcomingEvent ? (
            <Button
              disabled={upcomingEvent.shouldClose || !upcomingEvent.isRsvpOpen}
              href={upcomingEvent.link}
            >
              {upcomingEvent.shouldClose
                ? 'Closed for RSVP'
                : upcomingEvent.isRsvpOpen
                ? 'RSVP Now'
                : 'Coming Soon'}
            </Button>
          ) : (
            <Button href="#cta">Join Meetup</Button>
          )}
          {upcomingEvent &&
            (upcomingEvent.venue.directions || upcomingEvent.venue.mapURL) && (
              <IconLink
                sx={{ p: 3, mx: 3 }}
                href={
                  upcomingEvent.venue.directions || upcomingEvent.venue.mapURL
                }
              >
                <span
                  sx={{
                    mx: 1,
                  }}
                  css={theme => ({
                    display: 'inline-block',
                    [`@media screen and (max-width: ${theme.breakpoints[0]})`]: {
                      display: 'none',
                    },
                  })}
                >
                  Getting There
                </span>
                {upcomingEvent.venue.directions ? <Map /> : <Navigation2 />}
              </IconLink>
            )}
        </div>
      </Container>
    </div>
  );
}
