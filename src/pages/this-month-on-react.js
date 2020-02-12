import { graphql } from 'gatsby';
import React from 'react';
import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { PageTitle } from '../components/page-title';
import { Seo } from '../components/seo';
import { UpdatesForMeetup } from '../components/updates-for-meetup';
import { isFilledArray } from '../lib';

export default function ThisMonthOnReact({ data }) {
  return (
    <>
      <Seo
        title="This Month on React - KL React"
        description="Curated list of news on React ecosystem"
      />
      <Layout>
        <Container>
          <PageTitle>This Month on React</PageTitle>
          {data.allUpdateYaml.group.map(group => {
            if (!isFilledArray(group.nodes)) {
              return null;
            }

            const meetupId = group.nodes[0].meetupEvent.id;

            return (
              <UpdatesForMeetup
                meetupTitle={group.meetupTitle}
                meetupId={meetupId}
                updates={group.nodes}
                key={group.meetupTitle}
              />
            );
          })}
        </Container>
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query {
    allUpdateYaml {
      group(field: meetupEvent___meetup___name) {
        meetupTitle: fieldValue
        nodes {
          meetupEvent {
            id
          }
          ...Update
        }
      }
    }
  }
`;
