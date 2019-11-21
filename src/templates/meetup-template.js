import { graphql } from 'gatsby';
import React from 'react';
import { Layout } from '../components/layout';
import { MeetupOverview } from '../components/meetup-overview';
import { Schedule } from '../components/schedule';
import { Seo } from '../components/seo';
import { Photos } from '../components/photos';

const MeetupTemplate = ({ data, location }) => {
  const { schedule, meetup, photos, seoImagePublicUrl } = data.eventYaml;
  return (
    <>
      <Seo
        title={meetup && meetup.name}
        pathname={location.pathname}
        largeImage={seoImagePublicUrl}
      />
      <Layout>
        <MeetupOverview {...meetup} />
        <Schedule schedule={schedule} />
        <Photos photos={photos} />
      </Layout>
    </>
  );
};

export default MeetupTemplate;

export const pageQuery = graphql`
  query MeetupById($id: String!) {
    eventYaml(id: { eq: $id }) {
      seoImagePublicUrl
      meetup {
        ...MeetupOverview
      }
      schedule {
        ...ScheduleItem
      }
      photos {
        ...EventPhoto
      }
    }
  }
`;
