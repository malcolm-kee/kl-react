import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageTitle } from "@/components/page-title";
import { UpdatesForMeetup } from "@/components/updates-for-meetup";
import {
  getAllUpdates,
  getEventByName,
  groupBy,
  isFilledArray,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "This Month on React",
  description: "Curated list of news on React ecosystem",
};

export default function ThisMonthOnReactPage() {
  const allUpdates = getAllUpdates();
  const groups = groupBy(allUpdates, (u) => u.meetupEvent);

  return (
    <Container>
      <PageTitle>This Month on React</PageTitle>
      {groups.map(([eventName, updates]) => {
        if (!isFilledArray(updates)) {
          return null;
        }

        const event = getEventByName(eventName);
        const meetupTitle = event?.displayName ?? eventName;

        return (
          <UpdatesForMeetup
            meetupTitle={meetupTitle}
            meetupId={eventName}
            updates={updates}
            key={eventName}
          />
        );
      })}
    </Container>
  );
}
