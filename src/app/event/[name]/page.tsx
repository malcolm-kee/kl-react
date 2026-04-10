import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodelabSummary } from "@/components/codelab-summary";
import { Link } from "@/components/link";
import { MeetupOverview } from "@/components/meetup-overview";
import { Schedule } from "@/components/schedule";
import { Section } from "@/components/section";
import { Speakers } from "@/components/speakers";
import { Updates } from "@/components/updates";
import { VideoPlayer } from "@/components/video-player";
import { WebcastSummary } from "@/components/webcast-summary";
import { WorkshopSummary } from "@/components/workshop-summary";
import {
  getAllEvents,
  getEventByName,
  getInstructorsForEvent,
  getResolvedSchedule,
  getUpdatesForEvent,
  getVenueForEvent,
  isFilledArray,
  pluralize,
} from "@/lib/data";
import type { Event } from "@/lib/types";

interface EventPageProps {
  params: Promise<{ name: string }>;
}

export function generateStaticParams(): { name: string }[] {
  return getAllEvents().map((e) => ({ name: e.name }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { name } = await params;
  const event = getEventByName(name);
  if (!event) return {};

  return {
    title: event.displayName,
    description: event.description,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { name } = await params;
  const event = getEventByName(name);
  if (!event) notFound();

  const { venueName } = getVenueForEvent(event);

  switch (event.type) {
    case "meetup":
      return <MeetupContent event={event} venueName={venueName} />;
    case "webcast":
      return <WebcastContent event={event} venueName={venueName} />;
    case "workshop":
      return <WorkshopContent event={event} venueName={venueName} />;
    case "codelab":
      return <CodelabContent event={event} venueName={venueName} />;
  }
}

function EventOverview({
  event,
  venueName,
}: {
  event: Event;
  venueName: string;
}) {
  return (
    <MeetupOverview
      name={event.displayName}
      dateTime={event.dateStr}
      venueName={venueName}
      meetupUrl={event.meetupUrl}
      siteUrl={event.site}
    />
  );
}

function MeetupContent({
  event,
  venueName,
}: {
  event: Event;
  venueName: string;
}) {
  const schedule = getResolvedSchedule(event);
  const updates = getUpdatesForEvent(event.name);

  return (
    <>
      <EventOverview event={event} venueName={venueName} />
      {event.videoUrl && <VideoPlayer url={event.videoUrl} />}
      <Section title="Schedule" className="py-10">
        <Schedule schedule={schedule} />
      </Section>
      {isFilledArray(updates) && (
        <Section title="This Month on React" className="py-10">
          <Updates updates={updates} />
        </Section>
      )}
      {isFilledArray(event.links) && (
        <Section title="Other Links/Resources" className="py-10">
          <div className="prose-lg">
            <ol>
              {event.links.map((link) => (
                <li key={link.url}>
                  <Link to={link.url}>{link.label}</Link>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      )}
    </>
  );
}

function WebcastContent({
  event,
  venueName,
}: {
  event: Event;
  venueName: string;
}) {
  const instructors = getInstructorsForEvent(event);
  const schedule = getResolvedSchedule(event);

  return (
    <>
      <EventOverview event={event} venueName={venueName} />
      {event.videoUrl && <VideoPlayer url={event.videoUrl} />}
      <WebcastSummary
        description={event.description}
        takeaways={event.takeaways}
      />
      {isFilledArray(instructors) && (
        <Section title={pluralize("Instructor", instructors.length)}>
          <Speakers speakers={instructors} />
        </Section>
      )}
      {isFilledArray(schedule) && (
        <Section title="Schedule" className="py-10">
          <Schedule schedule={schedule} />
        </Section>
      )}
    </>
  );
}

function WorkshopContent({
  event,
  venueName,
}: {
  event: Event;
  venueName: string;
}) {
  const instructors = getInstructorsForEvent(event);

  return (
    <>
      <EventOverview event={event} venueName={venueName} />
      <WorkshopSummary
        description={event.description}
        takeaways={event.takeaways}
      />
      {isFilledArray(instructors) && (
        <Section title={pluralize("Instructor", instructors.length)}>
          <Speakers speakers={instructors} />
        </Section>
      )}
    </>
  );
}

function CodelabContent({
  event,
  venueName,
}: {
  event: Event;
  venueName: string;
}) {
  return (
    <>
      <EventOverview event={event} venueName={venueName} />
      <CodelabSummary description={event.description} />
    </>
  );
}
