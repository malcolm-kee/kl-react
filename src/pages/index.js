import { graphql } from 'gatsby';
import Layout from 'gatsby-theme-conference/src/components/layout';
import Speakers from 'gatsby-theme-conference/src/components/speakers';
import React from 'react';
import Banner from '../components/banner';
import CTA from '../components/cta';
import { Schedule } from '../components/schedule';
import Seo from '../components/seo';
import { useUpcomingEvent } from '../hooks/use-upcoming-event';

export default function HomePage({ data }) {
  const upcomingEvent = useUpcomingEvent();
  const upcomingEventSchedule = upcomingEvent && upcomingEvent.schedule;
  // get speakers for the upcoming event if there is any,
  // else just load 6 speakers from speaker list
  const speakers = upcomingEventSchedule
    ? upcomingEventSchedule
        .filter(
          item =>
            !!(item && item.type === 'talk' && item.talk && item.talk.speaker)
        )
        .map(item => item.talk.speaker)
    : data.allSpeakersYaml.edges.map(edge => edge.node);

  return (
    <>
      <Seo />
      <Layout>
        <Banner upcomingEvent={upcomingEvent} />
        {upcomingEventSchedule && <Schedule schedule={upcomingEventSchedule} />}
        <Speakers speakers={speakers} />
        <CTA />
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query {
    allSpeakersYaml(limit: 6) {
      edges {
        node {
          id
          name
          bio
          image
          company
          twitter
          github
          website
        }
      }
    }
  }
`;
