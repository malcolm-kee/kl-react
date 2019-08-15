import { graphql } from 'gatsby';
import React from 'react';
import { Styled } from 'theme-ui';
import { Layout } from '../components/layout';
import { Schedule } from '../components/schedule';
import Seo from '../components/seo';

function SchedulePage({ data: { meetupEvent }, location }) {
  return (
    <>
      <Seo pathname={location.pathname} />
      <Layout>
        {meetupEvent && meetupEvent.info && meetupEvent.info.schedule ? (
          <Schedule schedule={meetupEvent.info.schedule} />
        ) : (
          <Styled.h1>There is no upcoming event.</Styled.h1>
        )}
      </Layout>
    </>
  );
}

export default SchedulePage;

export const pageQuery = graphql`
  query {
    meetupEvent(status: { in: "upcoming" }) {
      info {
        schedule {
          time
          type
          desc
          talk {
            title
            description
            speaker {
              id
              name
              bio
              image
              company
              twitter
              github
            }
          }
        }
      }
    }
  }
`;
