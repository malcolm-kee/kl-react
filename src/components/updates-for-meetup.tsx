import type { Update as UpdateType } from "@/lib/types";
import { NLink } from "./nav-link";
import { Updates } from "./updates";

interface UpdatesForMeetupProps {
  updates: UpdateType[];
  meetupTitle: string;
  meetupId: string;
}

export function UpdatesForMeetup({
  updates,
  meetupTitle,
  meetupId,
}: UpdatesForMeetupProps) {
  return (
    <section className="py-4">
      <div className="text-3xl leading-9 font-extrabold sm:text-4xl sm:leading-10">
        <NLink to={`/event/${meetupId}`} primary>
          {meetupTitle}
        </NLink>
      </div>
      <div className="mt-6 border-t-2 border-gray-200 pt-6">
        <Updates updates={updates} />
      </div>
    </section>
  );
}
