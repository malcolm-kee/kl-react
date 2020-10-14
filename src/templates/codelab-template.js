import { graphql } from 'gatsby';
import React from 'react';
import { CodelabSummary } from '../components/codelab-summary';
import { Layout } from '../components/layout';
import { MeetupOverview } from '../components/meetup-overview';
import { Seo } from '../components/seo';

const CodelabTemplate = ({ data, location }) => {
  const { meetup, description, seoImagePublicUrl } = data.eventYaml;
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
        <CodelabSummary {...data.eventYaml} />
      </Layout>
    </>
  );
};

export default CodelabTemplate;

export const pageQuery = graphql`
  query CodelabByName($name: String!) {
    eventYaml(name: { eq: $name }) {
      ...CodelabSummary
      seoImagePublicUrl
      meetup {
        ...MeetupOverview
      }
    }
  }
`;
