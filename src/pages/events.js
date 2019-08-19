import { graphql } from 'gatsby';
import React from 'react';
import { EventPage } from '../components/event-page';
import { Seo } from '../components/seo';

function Events(props) {
  const events = props.data.allMeetupEvent.nodes;

  return (
    <>
      <Seo title="Events - KL React" pathname={props.location.pathname} />
      <EventPage events={events} />
    </>
  );
}

export default Events;

export const pageQuery = graphql`
  {
    allMeetupEvent(sort: { fields: local_date, order: DESC }) {
      nodes {
        ...EventCard
      }
    }
  }
`;
