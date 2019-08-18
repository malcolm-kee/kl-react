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
        dateTime(formatString: "ddd, DD MMM YYYY h:mm A")
        mapURL
        venueName
        info {
          schedule {
            time
            type
            desc
            talk {
              title
              description
              speaker {
                ...SpeakerCard
              }
            }
          }
        }
      }
    }
  `);

  if (!meetupEvent) {
    return null;
  }

  const { name, link, info, mapURL, venueName, isFull, dateTime } = meetupEvent;

  return {
    name,
    dateTime,
    link,
    isFull,
    venue: {
      name: venueName,
      mapURL,
    },
    schedule: info && info.schedule,
  };
}
