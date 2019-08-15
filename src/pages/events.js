import { graphql } from 'gatsby';
import React from 'react';
import { EventPage } from '../components/event-page';
import Seo from '../components/seo';

function Events(props) {
  const events = props.data.allMeetupEvent.nodes.map(node => ({
    ...node,
    venueName:
      (node.info && node.info.venue && node.info.venue.name) ||
      (node.venue && node.venue.name),
    isMeetup: node.info && node.info.type === 'meetup',
  }));

  return (
    <>
      <Seo pathname={props.location.pathname} />
      <EventPage events={events} />
    </>
  );
}

export default Events;

export const pageQuery = graphql`
  {
    allMeetupEvent(sort: { fields: local_date, order: DESC }) {
      nodes {
        id
        name
        status
        link
        dateTime(formatString: "ddd, DD MMM YYYY h:mm A")
        info {
          type
          venue {
            name
          }
        }
        venue {
          name
        }
      }
    }
  }
`;
