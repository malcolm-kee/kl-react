import { graphql } from 'gatsby';
import * as React from 'react';
import { Layout } from '../components/layout';
import { MeetupOverview } from '../components/meetup-overview';
import { Schedule } from '../components/schedule';
import { Seo } from '../components/seo';
import { Container } from '../components/container';
import { Photos } from '../components/photos';
import { Updates } from '../components/updates';
import { VideoPlayer } from '../components/video-player';

const MeetupTemplate = ({ data, location }) => {
  const {
    schedule,
    meetup,
    photos,
    seoImagePublicUrl,
    updates,
    videoUrl,
  } = data.eventYaml;
  return (
    <>
      <Seo
        title={meetup && meetup.name}
        pathname={location.pathname}
        largeImage={seoImagePublicUrl}
      />
      <Layout>
        <MeetupOverview {...meetup} />
        {videoUrl && <VideoPlayer url={videoUrl} />}
        <Schedule schedule={schedule} />
        <Container py={4}>
          <Updates title="This Month on React" updates={updates} />
        </Container>
        <Photos photos={photos} />
      </Layout>
    </>
  );
};

export default MeetupTemplate;

export const pageQuery = graphql`
  query MeetupById($id: String!) {
    eventYaml(id: { eq: $id }) {
      seoImagePublicUrl
      videoUrl
      meetup {
        ...MeetupOverview
      }
      schedule {
        ...ScheduleItem
      }
      photos {
        ...EventPhoto
      }
      updates {
        ...Update
      }
    }
  }
`;
