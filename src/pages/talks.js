/** @jsx jsx */

import { Container, jsx, Styled } from 'theme-ui';
import { graphql } from 'gatsby';
import React from 'react';
import { Seo } from '../components/seo';
import { Layout } from '../components/layout';
import { Link } from '../components/link';
import { TalkMaterialIcons } from '../components/talk-material-icons';

const Talk = ({ talk }) => (
  <div id={talk.id} key={talk.id}>
    <Styled.h3>{talk.title}</Styled.h3>
    <Styled.p sx={{ mb: 2 }}>
      by <Link to={`/speakers/#${talk.speaker.id}`}>{talk.speaker.name}</Link>{' '}
      on{' '}
      <Link to={`/event/${talk.event.id}`}>{talk.event.meetup.dateTime}</Link>
    </Styled.p>
    <Styled.p sx={{ mb: 2 }}>{talk.description}</Styled.p>
    <div sx={{ mb: 5 }}>
      {talk.materials &&
        talk.materials.map((material, i) => (
          <TalkMaterialIcons type={material.type} url={material.url} key={i} />
        ))}
    </div>
  </div>
);

export default function TalkPage({ data }) {
  return (
    <>
      <Seo title="Talks - KL React" description="Previous talks in KL React" />
      <Layout>
        <Container>
          <Styled.h1>Talks</Styled.h1>
          <p sx={{ mb: 5 }}>in alphabetical order</p>
          {data.allTalkYaml.nodes.map(node => (
            <Talk talk={node} key={node.id} />
          ))}
        </Container>
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query {
    allTalkYaml(sort: { fields: title }) {
      nodes {
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
        event {
          id
          meetup {
            dateTime(formatString: "DD MMM YYYY")
          }
        }
      }
    }
  }
`;
