/** @jsx jsx */

import { Container, jsx, Styled } from 'theme-ui';
import { graphql } from 'gatsby';
import React from 'react';
import { Seo } from '../components/seo';
import { Layout } from '../components/layout';
import { TalkMaterialIcons } from '../components/talk-material-icons';

export default function TalkPage({ data }) {
  return (
    <>
      <Seo title="Talks - KL React" />
      <Layout>
        <Container>
          <Styled.h1 sx={{ mb: 5 }}>Talks</Styled.h1>
          {data.allTalkYaml.edges.map(({ node }) => (
            <div key={node.id}>
              <Styled.h3>{node.title}</Styled.h3>
              <Styled.p sx={{ mb: 2 }}>by {node.speaker.name}</Styled.p>
              <Styled.p sx={{ mb: 2 }}>{node.description}</Styled.p>
              <div sx={{ mb: 5 }}>
                {node.materials &&
                  node.materials.map(material => (
                    <TalkMaterialIcons
                      type={material.type}
                      url={material.url}
                      key={node.id}
                    />
                  ))}
              </div>
            </div>
          ))}
        </Container>
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
