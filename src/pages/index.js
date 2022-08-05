import { graphql } from 'gatsby';
import * as React from 'react';
import { Banner } from '../components/banner';
import { CodelabSummary } from '../components/codelab-summary';
import { CTA } from '../components/cta';
import { Layout } from '../components/layout';
import { Schedule } from '../components/schedule';
import { Section } from '../components/section';
import { Seo } from '../components/seo';
import { Speakers } from '../components/speakers';
import { VideoPlayer } from '../components/video-player';
import { WebcastSummary } from '../components/webcast-summary';
import { WorkshopSummary } from '../components/workshop-summary';
import { useUpcomingEvent } from '../hooks/use-upcoming-event';
import { pluralize } from '../lib';

const sortSpeaker = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

// we get last 3 meetups and extract speakers from them instead of retrieve from speaker list directly
// so that we show speakers from most recent meetups
const getSpeakersForMeetups = (meetups) => {
  const speakers = [];

  outer: for (let meetup of meetups) {
    for (let schedule of meetup.info.schedule) {
      if (schedule.type === 'talk') {
        if (Array.isArray(schedule.talk.speakers)) {
          for (const scheduleSpeaker of schedule.talk.speakers) {
            if (
              !speakers.some((speaker) => speaker.id === scheduleSpeaker.id)
            ) {
              speakers.push(scheduleSpeaker);
              if (speakers.length >= 6) {
                break outer;
              }
            }
          }
        }
      }
    }
  }

  return speakers;
};

export default function HomePage({ data }) {
  const upcomingEvent = useUpcomingEvent();
  const upcomingEventSchedule = upcomingEvent && upcomingEvent.schedule;
  const last3Meetups = data.allMeetupEvent.nodes;

  // get speakers for the upcoming event if there is any,
  // else just load 6 speakers from speaker list
  const speakers = upcomingEvent
    ? upcomingEvent.instructors
      ? upcomingEvent.instructors
      : upcomingEventSchedule &&
        upcomingEventSchedule
          .filter(
            (item) =>
              !!(
                item &&
                item.type === 'talk' &&
                item.talk &&
                Array.isArray(item.talk.speakers)
              )
          )
          .map((item) => item.talk.speakers)
          .flat()
          .sort(sortSpeaker)
    : getSpeakersForMeetups(last3Meetups).sort(sortSpeaker);

  return (
    <>
      <Seo largeImage={upcomingEvent && upcomingEvent.seoImage} />
      <Layout hideHeader>
        <Banner upcomingEvent={upcomingEvent} />
        <div className="bg-gradient-to-b from-primary-100 to-white">
          {upcomingEventSchedule && (
            <Section id="schedule" title="Schedule" className="py-10">
              <Schedule schedule={upcomingEventSchedule} speakersOnSamePage />
            </Section>
          )}
          {upcomingEvent && upcomingEvent.videoUrl && (
            <VideoPlayer url={upcomingEvent.videoUrl} />
          )}
          {upcomingEvent && upcomingEvent.type === 'workshop' && (
            <WorkshopSummary {...upcomingEvent} />
          )}
          {upcomingEvent && upcomingEvent.type === 'webcast' && (
            <WebcastSummary {...upcomingEvent} />
          )}
          {upcomingEvent && upcomingEvent.type === 'codelab' && (
            <CodelabSummary {...upcomingEvent} />
          )}
          {speakers && (
            <Section
              id="speakers"
              title="Speakers"
              description={
                speakers &&
                speakers.length > 1 && (
                  <p className="mb-8 text-xl leading-7 text-gray-500">
                    {'/* in alphabetical order */'}
                  </p>
                )
              }
              className="py-10"
            >
              <Speakers
                title={
                  upcomingEvent
                    ? pluralize(
                        upcomingEvent.type === 'workshop'
                          ? 'Instructor'
                          : 'Speaker',
                        speakers.length
                      )
                    : 'Recent Speakers'
                }
                speakers={speakers}
                showMore
              />
            </Section>
          )}
          <CTA />
        </div>
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query {
    allMeetupEvent(
      filter: { isMeetup: { eq: true } }
      sort: { order: DESC, fields: dateTime }
      limit: 3
    ) {
      nodes {
        info {
          schedule {
            type
            talk {
              title
              speakers {
                ...SpeakerCard
              }
            }
          }
        }
      }
    }
  }
`;
