// By Matt

import { graphql } from 'gatsby';
import React from 'react';
import { Seo } from '../components/seo';
import { Layout } from '../components/layout';

export default function TalkPage({ data }) {
  return (
    <>
      <Seo title="Talks - KL React" />
      <Layout>
        <h1>Some talks</h1>
        {data.allTalkYaml.edges.map(({ node }) => (
          <div key={node.id}>
            <h4>{node.title}</h4>
            <p>{node.description}</p>
            <p>{node.speaker.name}</p>
            <ul>
              <li>{node.materials[0].url}</li>
            </ul>
          </div>
        ))}
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query MyQuery {
    allTalkYaml {
      edges {
        node {
          id
          title
          description
          speaker {
            name
          }
          materials {
            type
            url
          }
        }
      }
    }
  }
`;
