import { graphql } from 'gatsby';
import React from 'react';
import { Layout } from '../components/layout';
import { MeetupOverview } from '../components/meetup-overview';
import { Photos } from '../components/photos';
import { Section } from '../components/section';
import { Seo } from '../components/seo';
import { Speakers } from '../components/speakers';
import { WorkshopSummary } from '../components/workshop-summary';
import { pluralize } from '../lib';

const WorkshopTemplate = ({ data, location }) => {
  const {
    meetup,
    description,
    seoImagePublicUrl,
    photos,
    instructor,
  } = data.eventYaml;
  return (
    <>
      <Seo
        title={meetup.name}
        pathname={location.pathname}
        description={description}
        largeImage={seoImagePublicUrl}
      />
      <Layout>
        <MeetupOverview {...meetup} />
        <WorkshopSummary {...data.eventYaml} />
        <Section title={pluralize('Instructor', instructor.length)}>
          <Speakers speakers={instructor} />
        </Section>
        <Photos photos={photos} />
      </Layout>
    </>
  );
};

export default WorkshopTemplate;

export const pageQuery = graphql`
  query WorkshopByName($name: String!) {
    eventYaml(name: { eq: $name }) {
      ...WorkshopSummary
      instructor {
        ...SpeakerCard
      }
      seoImagePublicUrl
      meetup {
        ...MeetupOverview
      }
      photos {
        ...EventPhoto
      }
    }
  }
`;
