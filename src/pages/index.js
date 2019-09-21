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
  const upcomingEvent = useUpcomingEvent();
  const upcomingEventSchedule = upcomingEvent && upcomingEvent.schedule;

  // get speakers for the upcoming event if there is any,
  // else just load 6 speakers from speaker list
  const speakers = upcomingEvent
    ? upcomingEvent &&
      upcomingEventSchedule &&
      upcomingEventSchedule
        .filter(
          item =>
            !!(item && item.type === 'talk' && item.talk && item.talk.speaker)
        )
        .map(item => item.talk.speaker)
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
    : data.allSpeakerYaml.edges.map(edge => edge.node);

  return (
    <>
      <Seo />
      <Layout>
        <Banner upcomingEvent={upcomingEvent} />
        {upcomingEventSchedule && (
          <div id="schedule" sx={{ py: 5 }}>
            <Schedule schedule={upcomingEventSchedule} speakersOnSamePage />
          </div>
        )}
        <div
          id="speakers"
          sx={{
            py: 5,
          }}
        >
          <Speakers speakers={speakers} showMore />
        </div>
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
