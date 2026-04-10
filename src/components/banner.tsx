import { siteMetadata } from '@/lib/site';
import type { EventWithVenue } from '@/lib/types';
import cx from 'classnames';
import * as React from 'react';
import { FiMap as Map, FiNavigation2 as Navigation2 } from 'react-icons/fi';
import './banner.css';
import { NButtonLink } from './button';
import { IconLink } from './icon-link';

interface BannerProps {
  upcomingEvent: EventWithVenue | null;
  className?: string;
}

export function Banner({ upcomingEvent, className }: BannerProps) {
  const rsvpLink =
    upcomingEvent?.rsvpLink ?? upcomingEvent?.meetupUrl ?? undefined;
  const isPast = React.useMemo(
    () => (upcomingEvent ? new Date(upcomingEvent.date) < new Date() : true),
    [upcomingEvent]
  );

  return (
    <div className={cx('relative md:min-h-150 pt-16 banner', className)}>
      <div className="relative mx-auto max-w-5xl px-4 sm:mt-12 sm:px-6 md:mt-10 lg:mt-16">
        <div className="py-12">
          <h1 className="text-4xl md:text-6xl font-medium text-primary-600">
            {upcomingEvent ? upcomingEvent.displayName : siteMetadata.title}
          </h1>
          <div className="mb-3 md:mb-6 space-y-3">
            {upcomingEvent && (
              <p className="text-lg md:text-2xl xl:text-3xl">
                {upcomingEvent.dateStr}
              </p>
            )}
            <p className="text-lg md:text-2xl xl:text-3xl">
              {upcomingEvent
                ? `@${upcomingEvent.venueName}`
                : siteMetadata.description}
            </p>
          </div>
          <div className="flex">
            {upcomingEvent && !isPast && rsvpLink ? (
              <NButtonLink href={rsvpLink} size="large">
                RSVP Now
              </NButtonLink>
            ) : (
              <NButtonLink href="https://www.meetup.com/kl-react/" size="large">
                Join Meetup
              </NButtonLink>
            )}
            {upcomingEvent?.venueData &&
              (upcomingEvent.venueData.directions ??
                upcomingEvent.venueData.mapURL) != null && (
                <IconLink
                  href={
                    upcomingEvent.venueData.directions ??
                    upcomingEvent.venueData.mapURL
                  }
                  className="p-3 mx-3 inline-flex items-center"
                >
                  <span className="mx-1 hidden sm:inline-block">
                    Getting There
                  </span>
                  {upcomingEvent.venueData.directions ? (
                    <Map className="w-6 h-6" />
                  ) : (
                    <Navigation2 className="w-6 h-6" />
                  )}
                </IconLink>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
