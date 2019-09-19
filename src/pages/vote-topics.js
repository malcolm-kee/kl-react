import { graphql } from 'gatsby';
import React from 'react';
import { Layout } from '../components/layout';
import { Seo } from '../components/seo';

const VoteTopics = ({ data, location }) => {
  return (
    <>
      <Seo
        title="Vote Talk Topics"
        description="List of talk topics, voted by communities"
        pathname={location.pathname}
      />
      <Layout>
        <h1>TODO</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Layout>
    </>
  );
};

export default VoteTopics;

export const pageQuery = graphql`
  query {
    github {
      repository(name: "kl-react", owner: "malcolm-kee") {
        issue(number: 5) {
          comments(first: 100) {
            nodes {
              databaseId
              bodyHTML
              author {
                avatarUrl
                url
                ... on GitHub_User {
                  name
                }
              }
              reactionGroups {
                content
                users {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`;
