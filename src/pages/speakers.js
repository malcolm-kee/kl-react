import { graphql } from 'gatsby';
import React from 'react';
import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { PageTitle } from '../components/page-title';
import { Seo } from '../components/seo';
import { Speakers } from '../components/speakers';

export default function SpeakersPage({ data }) {
  const speakers = data.allSpeakerYaml.nodes;

  return (
    <>
      <Seo
        title="Speakers - KL React"
        description="Speakers that had given talk or workshop in KL React"
      />
      <Layout>
        <Container>
          <PageTitle>Speakers</PageTitle>
          {speakers && speakers.length > 1 && (
            <p className="mb-8 text-gray-500">
              {'/* in alphabetical order */'}
            </p>
          )}
          <Speakers speakers={speakers} showPastEvents />
        </Container>
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
