import { graphql } from 'gatsby';
import * as React from 'react';
import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { Link } from '../components/link';
import { MeetupOverview } from '../components/meetup-overview';
import { NumberedList } from '../components/numbered-list';
import { Photos } from '../components/photos';
import { Schedule } from '../components/schedule';
import { SectionHeading } from '../components/section-heading';
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
        <Schedule schedule={schedule} />
        <Container py={4}>
          <Updates title="This Month on React" updates={updates} />
        </Container>
        {links && isFilledArray(links) && (
          <Container py={4}>
            <SectionHeading>Others Links/Resources</SectionHeading>
            <NumberedList>
              {links.map((link) => (
                <li key={link.url}>
                  <Link to={link.url} isExternal>
                    {link.label}
                  </Link>
                </li>
              ))}
            </NumberedList>
          </Container>
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
