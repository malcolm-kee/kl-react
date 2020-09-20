/** @jsx jsx */
import cx from 'classnames';
import { FiMap as Map, FiNavigation2 as Navigation2 } from 'react-icons/fi';
import { jsx } from 'theme-ui';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import './banner.css';
import { NButton } from './button';
import { Header } from './header';
import { IconLink } from './icon-link';
import { NLink } from './nav-link';

export function Banner({ upcomingEvent, className, ...props }) {
  const { title, description } = useSiteMetadata();

  return (
    <div className={cx('relative md:h-screen banner', className)}>
      <Header flat />
      <div className="relative mx-auto max-w-5xl px-4 sm:mt-12 sm:px-6 md:mt-10 lg:mt-16">
        <div className="py-12" {...props}>
          <h1 className="text-4xl md:text-6xl font-medium text-primary-600">
            {upcomingEvent ? upcomingEvent.name : title}
          </h1>
          {upcomingEvent && (
            <p className="text-lg md:text-2xl xl:text-3xl mb-3 md:mb-6">
              {upcomingEvent.dateTime}
            </p>
          )}
          <p className="text-lg md:text-2xl xl:text-3xl mb-3 md:mb-6">
            {upcomingEvent
              ? upcomingEvent.venue.name
                ? `@${upcomingEvent.venue.name}`
                : '(Needs a location)'
              : description}
          </p>
          <div className="flex">
            {upcomingEvent ? (
              <NButton
                as={NLink}
                disabled={
                  upcomingEvent.shouldClose || !upcomingEvent.isRsvpOpen
                }
                size="large"
                to={upcomingEvent.link}
              >
                {upcomingEvent.shouldClose
                  ? 'Closed for RSVP'
                  : upcomingEvent.isRsvpOpen
                  ? 'RSVP Now'
                  : 'Coming Soon'}
              </NButton>
            ) : (
              <NButton to="#cta" as={NLink} size="large">
                Join Meetup
              </NButton>
            )}
            {upcomingEvent &&
              (upcomingEvent.venue.directions ||
                upcomingEvent.venue.mapURL) && (
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
                    css={(theme) => ({
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
        </div>
      </div>
    </div>
  );
}
