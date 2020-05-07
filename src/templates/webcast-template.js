import { graphql } from 'gatsby';
import * as React from 'react';
import { Layout } from '../components/layout';
import { MeetupOverview } from '../components/meetup-overview';
import { Seo } from '../components/seo';
import { Speakers } from '../components/speakers';
import { VideoPlayer } from '../components/video-player';
import { WebcastSummary } from '../components/webcast-summary';
import { pluralize } from '../lib';

const WebcastTemplate = ({ data, location }) => {
  const {
    meetup,
    description,
    seoImagePublicUrl,
    videoUrl,
    instructor,
  } = data.eventYaml;
  return (
    <>
      <Seo
        title={meetup.name}
        pathname={location.pathname}
        description={description}
        largeImage={seoImagePublicUrl}
      />
      <Layout>
        <MeetupOverview {...meetup} />
        <VideoPlayer url={videoUrl} />
        <WebcastSummary {...data.eventYaml} />
        <Speakers
          title={pluralize('Instructor', instructor.length)}
          speakers={instructor}
        />
      </Layout>
    </>
  );
};

export default WebcastTemplate;

export const pageQuery = graphql`
  query WebcastById($id: String!) {
    eventYaml(id: { eq: $id }) {
      ...WebcastSummary
      videoUrl
      instructor {
        ...SpeakerCard
      }
      seoImagePublicUrl
      meetup {
        ...MeetupOverview
      }
    }
  }
`;
