import { useStaticQuery, graphql } from 'gatsby';

export function useUpcomingEvent() {
  const { meetupEvent } = useStaticQuery(graphql`
    {
      meetupEvent(status: { in: "upcoming" }) {
        name
        link
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

  const { name, link, date, info, mapURL, venue } = meetupEvent;
  const venueInfo = info && info.venue;

  return {
    name,
    link,
    date,
    venue: {
      name: (venueInfo && venueInfo.name) || (venue && venue.name),
      mapURL: (venueInfo && venueInfo.mapURL) || mapURL,
    },
    schedule: info && info.schedule,
  };
}
