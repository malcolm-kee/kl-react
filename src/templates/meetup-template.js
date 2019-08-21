import { graphql } from 'gatsby';
import React from 'react';
import { Layout } from '../components/layout';
import { MeetupOverview } from '../components/meetup-overview';
import { Schedule } from '../components/schedule';
import { Seo } from '../components/seo';

const MeetupTemplate = ({ data }) => {
  const { schedule, meetup } = data.eventYaml;
  return (
    <>
      <Seo />
      <Layout>
        <MeetupOverview {...meetup} />
        <Schedule schedule={schedule} />
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
    }
  }
`;
