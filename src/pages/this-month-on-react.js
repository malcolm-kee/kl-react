import { graphql } from 'gatsby';
import React from 'react';
import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { PageTitle } from '../components/page-title';
import { Seo } from '../components/seo';
import { UpdatesForMeetup } from '../components/updates-for-meetup';
import { isFilledArray, groupBy } from '../lib';

export default function ThisMonthOnReact({ data }) {
  const groups = groupBy(data.allUpdateYaml.nodes, node => node.meetupEvent.id);

  return (
    <>
      <Seo
        title="This Month on React - KL React"
        description="Curated list of news on React ecosystem"
      />
      <Layout>
        <Container>
          <PageTitle>This Month on React</PageTitle>
          {groups.map(([meetupId, updates]) => {
            if (!isFilledArray(updates)) {
              return null;
            }

            const meetupTitle = updates[0].meetupEvent.meetup.name;

            return (
              <UpdatesForMeetup
                meetupTitle={meetupTitle}
                meetupId={meetupId}
                updates={updates}
                key={meetupId}
              />
            );
          })}
        </Container>
      </Layout>
    </>
  );
}

// GraphQL groupBy somehow not working, manually group them as workaround for now
export const pageQuery = graphql`
  query {
    allUpdateYaml {
      nodes {
        title
        description
        links {
          label
          url
        }
        meetupEvent {
          id
          meetup {
            name
          }
        }
      }
    }
  }
`;
