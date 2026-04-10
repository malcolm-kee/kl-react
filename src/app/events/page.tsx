import type { Metadata } from "next";
import { Container } from "@/components/container";
import { EventCard } from "@/components/event-card";
import { PageTitle } from "@/components/page-title";
import {
  getAllEventsSorted,
  getSpeakersForEvent,
  getInstructorsForEvent,
  getVenueForEvent,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
};

export default function EventsPage() {
  const events = getAllEventsSorted();

  return (
    <Container>
      <PageTitle>Events</PageTitle>
      <div className="mt-12 border-t-2 border-gray-300 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {events.map((event) => {
            const speakers =
              event.type === "workshop" || event.type === "webcast"
                ? getInstructorsForEvent(event)
                : getSpeakersForEvent(event);
            const { venueName } = getVenueForEvent(event);

            return (
              <EventCard
                key={event.name}
                event={event}
                speakers={speakers}
                venueName={venueName}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}
