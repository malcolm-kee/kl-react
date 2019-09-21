import { graphql } from 'gatsby';
import React from 'react';
import { Banner } from '../components/banner';
import { CTA } from '../components/cta';
import { Layout } from '../components/layout';
import { Schedule } from '../components/schedule';
import { Seo } from '../components/seo';
import { Speakers } from '../components/speakers';
import { useUpcomingEvent } from '../hooks/use-upcoming-event';

export default function HomePage({ data }) {
  const speakers = data.allSpeakerYaml.edges.map(edge => edge.node);
  const upcomingEvent = useUpcomingEvent();
  const upcomingEventSchedule = upcomingEvent && upcomingEvent.schedule;

  return (
    <>
      <Seo />
      <Layout>
        <Banner upcomingEvent={upcomingEvent} />
        {upcomingEventSchedule && (
          <div id="schedule" sx={{ py: 5 }}>
            <Schedule schedule={upcomingEventSchedule} />
          </div>
        )}
        {!upcomingEvent && (
          <div
            id="speakers"
            sx={{
              py: 5,
            }}
          >
            <Speakers speakers={speakers} showMore />
          </div>
        )}
        <CTA />
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query {
    allSpeakerYaml(limit: 6) {
      edges {
        node {
          ...SpeakerCard
        }
      }
    }
  }
`;
