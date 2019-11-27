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
        isRsvpOpen
        shouldClose
        dateTime(formatString: "ddd, DD MMM YYYY h:mm A")
        mapURL
        directions
        venueName
        info {
          ...WorkshopSummary
          rsvpLink
          seoImagePublicUrl
          type
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
          instructor {
            ...SpeakerCard
          }
        }
      }
    }
  `);

  if (!meetupEvent) {
    return null;
  }

  const {
    name,
    link,
    info,
    mapURL,
    directions,
    venueName,
    isFull,
    isRsvpOpen,
    shouldClose,
    dateTime,
  } = meetupEvent;

  return {
    name,
    dateTime,
    link: (info && info.rsvpLink) || link,
    type: info && info.type,
    shouldClose,
    isFull,
    isRsvpOpen,
    venue: {
      name: venueName,
      mapURL,
      directions,
    },
    schedule: info && info.schedule,
    seoImage: info && info.seoImagePublicUrl,
    instructors: info && info.instructor,
    description: info && info.description,
    takeaways: info && info.takeaways,
  };
}
