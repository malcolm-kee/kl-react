import { useStaticQuery, graphql } from 'gatsby';

/**
 * Get the data for next upcoming event from the meetup group.
 *
 * Returns `null` when no upcoming event.
 */
export function useUpcomingEvent() {
  const { meetupEvent } = useStaticQuery(graphql`
    {
      meetupEvent(status: { in: "upcoming" }) {
        name
        link
        isFull
        time: local_time
        date: local_date(formatString: "ddd, DD MMM YYYY")
        info {
          schedule {
            time
            type
            desc
            talk {
              title
              description
              speaker {
                id
                name
                bio
                image
                company
                twitter
                github
              }
            }
          }
          venue {
            name
            mapURL
          }
        }
        mapURL
        venue {
          name
        }
      }
    }
  `);

  if (!meetupEvent) {
    return null;
  }

  const { name, link, date, info, mapURL, venue, time, isFull } = meetupEvent;
  const venueInfo = info && info.venue;

  return {
    name,
    link,
    isFull,
    time,
    date,
    venue: {
      name: (venueInfo && venueInfo.name) || (venue && venue.name),
      mapURL: (venueInfo && venueInfo.mapURL) || mapURL,
    },
    schedule: info && info.schedule,
  };
}
