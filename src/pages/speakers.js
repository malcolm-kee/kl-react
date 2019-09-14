import { graphql } from 'gatsby';
import React from 'react';
import { Seo } from '../components/seo';
import { Speakers } from '../components/speakers';
import { Layout } from '../components/layout';

export default function SpeakersPage({ data }) {
  return (
    <>
      <Seo
        title="Speakers - KL React"
        description="Speakers that had given talk or workshop in KL React"
      />
      <Layout>
        <Speakers speakers={data.allSpeakerYaml.nodes} showPastEvents />
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query {
    allSpeakerYaml(sort: { fields: name }) {
      nodes {
        ...SpeakerCard
      }
    }
  }
`;
