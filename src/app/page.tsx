import type { Metadata } from 'next';
import { Banner } from '@/components/banner';
import { CTA } from '@/components/cta';
import { Schedule } from '@/components/schedule';
import { Section } from '@/components/section';
import { SpeakerCard } from '@/components/speaker-card';
import { NLink } from '@/components/nav-link';
import {
  getAllEventsSorted,
  getUpcomingEvent,
  getResolvedSchedule,
  getSpeakersForEvent,
  getInstructorsForEvent,
  getSpeakerImageUrl,
  pluralize,
} from '@/lib/data';
import type { Speaker } from '@/lib/types';

export const metadata: Metadata = {
  title: 'KL React - Reacting in Kuala Lumpur, Malaysia',
};

/**
 * Get speakers from last 3 meetups (most recent speakers)
 * instead of from the full speaker list.
 */
function getSpeakersForRecentMeetups(): Speaker[] {
  const meetups = getAllEventsSorted().filter((e) => e.type === 'meetup');
  const speakers: Speaker[] = [];
  const seen = new Set<string>();

  for (const meetup of meetups.slice(0, 3)) {
    const eventSpeakers = getSpeakersForEvent(meetup);
    for (const speaker of eventSpeakers) {
      if (!seen.has(speaker.id)) {
        seen.add(speaker.id);
        speakers.push(speaker);
        if (speakers.length >= 6) return speakers;
      }
    }
  }

  return speakers;
}

const upcomingEvent = getUpcomingEvent();

const resolvedSchedule = upcomingEvent
  ? getResolvedSchedule(upcomingEvent)
  : [];

const speakers = upcomingEvent
  ? upcomingEvent.type === 'workshop' || upcomingEvent.type === 'webcast'
    ? getInstructorsForEvent(upcomingEvent)
    : getSpeakersForEvent(upcomingEvent)
  : getSpeakersForRecentMeetups();

export default function HomePage() {
  const speakerLabel = upcomingEvent
    ? pluralize(
        upcomingEvent.type === 'workshop' ? 'Instructor' : 'Speaker',
        speakers.length
      )
    : 'Recent Speakers';

  return (
    <div className="-mt-10">
      <Banner upcomingEvent={upcomingEvent} />
      <div className="bg-linear-to-b from-primary-100 to-white">
        {resolvedSchedule.length > 0 && (
          <Section id="schedule" title="Schedule" className="py-10">
            <Schedule schedule={resolvedSchedule} speakersOnSamePage />
          </Section>
        )}
        {speakers.length > 0 && (
          <Section
            id="speakers"
            title="Speakers"
            description={
              speakers.length > 1 ? (
                <p className="mb-8 text-xl leading-7 text-gray-500">
                  {'/* in alphabetical order */'}
                </p>
              ) : undefined
            }
            className="py-10"
          >
            <div>
              <h3 className="sr-only">{speakerLabel}</h3>
              <ul className="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8">
                {[...speakers]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((speaker) => (
                    <li className="sm:py-8" key={speaker.id}>
                      <SpeakerCard
                        speaker={speaker}
                        imageUrl={getSpeakerImageUrl(speaker, 'lg')}
                      />
                    </li>
                  ))}
              </ul>
              <div className="my-12 text-center lg:text-left">
                <NLink to="/speakers" primary className="text-xl">
                  View speakers for previous meetups/workshops
                </NLink>
              </div>
            </div>
          </Section>
        )}
        <CTA />
      </div>
    </div>
  );
}
