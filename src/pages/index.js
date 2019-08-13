import { graphql } from 'gatsby';
import Layout from 'gatsby-theme-conference/src/components/layout';
import Speakers from 'gatsby-theme-conference/src/components/speakers';
import React from 'react';
import Banner from '../components/banner';
import CTA from '../components/cta';
import Seo from '../components/seo';

const Landing = ({ speakers }) => (
  <Layout>
    <Seo />
    <Banner />
    <Speakers speakers={speakers} />
    {/* <Venue {...venue} /> */}
    {/* <Schedule schedule={schedule} /> */}
    {/* <MCs mcs={mcs} /> */}
    {/* <Sponsors sponsors={sponsors} /> */}
    <CTA />
  </Layout>
);

export default props => {
  const { data } = props;
  const speakers = data.allSpeakersYaml.edges.map(edge => edge.node);
  //   const schedule = data.allScheduleYaml.edges.map(edge => edge.node)

  return <Landing {...props} speakers={speakers} />;
};

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
        }
      }
    }
  }
`;
