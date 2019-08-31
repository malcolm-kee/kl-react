import { graphql } from 'gatsby';
import React from 'react';
import { Layout } from '../components/layout';
import { MeetupOverview } from '../components/meetup-overview';
import { Schedule } from '../components/schedule';
import { Seo } from '../components/seo';
import { Photos } from '../components/photos';

const MeetupTemplate = ({ data, location }) => {
  const { schedule, meetup, s3Photos } = data.eventYaml;
  return (
    <>
      <Seo title={meetup && meetup.name} pathname={location.pathname} />
      <Layout>
        <MeetupOverview {...meetup} />
        <Schedule schedule={schedule} />
        <Photos photos={s3Photos} />
      </Layout>
    </>
  );
};

export default MeetupTemplate;

export const pageQuery = graphql`
  query MeetupById($id: String!) {
    eventYaml(id: { eq: $id }) {
      meetup {
        ...MeetupOverview
      }
      schedule {
        ...ScheduleItem
      }
      s3Photos {
        ...EventPhoto
      }
    }
  }
`;
