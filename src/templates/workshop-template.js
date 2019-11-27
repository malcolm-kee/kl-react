import { graphql } from 'gatsby';
import React from 'react';
import { Layout } from '../components/layout';
import { MeetupOverview } from '../components/meetup-overview';
import { Seo } from '../components/seo';
import { Photos } from '../components/photos';
import { Speakers } from '../components/speakers';
import { pluralize } from '../lib';
import { WorkshopSummary } from '../components/workshop-summary';

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
        <Speakers
          title={pluralize('Instructor', instructor.length)}
          speakers={instructor}
        />
        <Photos photos={photos} />
      </Layout>
    </>
  );
};

export default WorkshopTemplate;

export const pageQuery = graphql`
  query WorkshopById($id: String!) {
    eventYaml(id: { eq: $id }) {
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
