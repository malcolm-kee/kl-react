import { graphql } from 'gatsby';
import React from 'react';
import { Seo } from '../components/seo';
import { Speakers } from '../components/speakers';
import { Layout } from '../components/layout';

export default function SpeakersPage({ data }) {
  return (
    <>
      <Seo title="Speakers" />
      <Layout>
        <Speakers speakers={data.allSpeakersYaml.nodes} />
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query {
    allSpeakersYaml {
      nodes {
        ...SpeakerCard
      }
    }
  }
`;
