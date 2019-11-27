import { graphql } from 'gatsby';
import React from 'react';
import { Layout } from '../components/layout';
import { Seo } from '../components/seo';
import { Talks } from '../components/talks';

export default function TalkPage({ data }) {
  return (
    <>
      <Seo title="Talks - KL React" description="Previous talks in KL React" />
      <Layout>
        <Talks talks={data.allTalkYaml.nodes} />
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query {
    allTalkYaml(sort: { fields: title }) {
      nodes {
        ...Talk
      }
    }
  }
`;
