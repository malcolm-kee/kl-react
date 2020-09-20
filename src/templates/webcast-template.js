import { graphql } from 'gatsby';
import * as React from 'react';
import { Layout } from '../components/layout';
import { MeetupOverview } from '../components/meetup-overview';
import { Schedule } from '../components/schedule';
import { Section } from '../components/section';
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
    schedule,
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
        {instructor && (
          <Section title={pluralize('Instructor', instructor.length)}>
            <Speakers speakers={instructor} />
          </Section>
        )}
        {schedule && <Schedule schedule={schedule} />}
      </Layout>
    </>
  );
};

export default WebcastTemplate;

export const pageQuery = graphql`
  query WebcastByName($name: String!) {
    eventYaml(name: { eq: $name }) {
      ...WebcastSummary
      videoUrl
      instructor {
        ...SpeakerCard
      }
      schedule {
        time
        type
        desc
        talk {
          title
          description
          speaker {
            ...SpeakerCard
          }
        }
      }
      seoImagePublicUrl
      meetup {
        ...MeetupOverview
      }
    }
  }
`;
