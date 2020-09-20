import { graphql } from 'gatsby';
import * as React from 'react';
import { Layout } from '../components/layout';
import { Link } from '../components/link';
import { MeetupOverview } from '../components/meetup-overview';
import { Photos } from '../components/photos';
import { Schedule } from '../components/schedule';
import { Section } from '../components/section';
import { Seo } from '../components/seo';
import { Updates } from '../components/updates';
import { VideoPlayer } from '../components/video-player';
import { isFilledArray } from '../lib';

const MeetupTemplate = ({ data, location }) => {
  const {
    schedule,
    meetup,
    photos,
    seoImagePublicUrl,
    updates,
    videoUrl,
    links,
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
        <Section title="Schedule" className="py-10">
          <Schedule schedule={schedule} />
        </Section>
        {updates && updates.length > 0 && (
          <Section title="This Month on React" className="py-10">
            <Updates updates={updates} />
          </Section>
        )}
        {links && isFilledArray(links) && (
          <Section title="Others Links/Resources" className="py-10">
            <div className="prose-lg">
              <ol>
                {links.map((link) => (
                  <li key={link.url}>
                    <Link to={link.url} isExternal>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </Section>
        )}
        <Photos photos={photos} />
      </Layout>
    </>
  );
};

export default MeetupTemplate;

export const pageQuery = graphql`
  query MeetupByName($name: String!) {
    eventYaml(name: { eq: $name }) {
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
      links {
        url
        label
      }
    }
  }
`;
