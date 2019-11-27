import { graphql } from 'gatsby';
import React from 'react';
import { Banner } from '../components/banner';
import { CTA } from '../components/cta';
import { Layout } from '../components/layout';
import { Schedule } from '../components/schedule';
import { Seo } from '../components/seo';
import { Speakers } from '../components/speakers';
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
const getSpeakersForMeetups = meetups => {
  const speakers = [];

  outer: for (let meetup of meetups) {
    for (let schedule of meetup.info.schedule) {
      if (schedule.type === 'talk') {
        if (
          !speakers.some(speaker => speaker.id === schedule.talk.speaker.id)
        ) {
          speakers.push(schedule.talk.speaker);
          if (speakers.length >= 6) {
            break outer;
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
            item =>
              !!(item && item.type === 'talk' && item.talk && item.talk.speaker)
          )
          .map(item => item.talk.speaker)
          .sort(sortSpeaker)
    : getSpeakersForMeetups(last3Meetups).sort(sortSpeaker);

  return (
    <>
      <Seo largeImage={upcomingEvent && upcomingEvent.seoImage} />
      <Layout>
        <Banner upcomingEvent={upcomingEvent} />
        {upcomingEventSchedule && (
          <div id="schedule" sx={{ py: 5 }}>
            <Schedule schedule={upcomingEventSchedule} speakersOnSamePage />
          </div>
        )}
        {upcomingEvent.type === 'workshop' && (
          <WorkshopSummary {...upcomingEvent} />
        )}
        <div
          id="speakers"
          sx={{
            py: 5,
          }}
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
        </div>
        <CTA />
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
              speaker {
                ...SpeakerCard
              }
            }
          }
        }
      }
    }
  }
`;
