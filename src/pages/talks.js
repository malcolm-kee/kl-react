/** @jsx jsx */

import { Container, jsx, Styled } from 'theme-ui';
import { graphql } from 'gatsby';
import React from 'react';
import { Seo } from '../components/seo';
import { Layout } from '../components/layout';
import { Link } from '../components/link';
import { TalkMaterialIcons } from '../components/talk-material-icons';

export default function TalkPage({ data }) {
  return (
    <>
      <Seo title="Talks - KL React" description="Previous talks in KL React" />
      <Layout>
        <Container>
          <Styled.h1>Talks</Styled.h1>
          <p sx={{ mb: 5 }}>in alphabetical order</p>
          {data.allTalkYaml.edges.map(({ node }) => (
            <div key={node.id}>
              <Styled.h3>{node.title}</Styled.h3>
              <Styled.p sx={{ mb: 2 }}>
                by{' '}
                <Link to={`/speakers/#${node.speaker.id}`}>
                  {node.speaker.name}
                </Link>
              </Styled.p>
              <Styled.p sx={{ mb: 2 }}>{node.description}</Styled.p>
              <div sx={{ mb: 5 }}>
                {node.materials &&
                  node.materials.map((material, i) => (
                    <TalkMaterialIcons
                      type={material.type}
                      url={material.url}
                      key={i}
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
  query {
    allTalkYaml(sort: { fields: title }) {
      edges {
        node {
          id
          title
          description
          speaker {
            id
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
