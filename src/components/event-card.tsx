import type { Event, Speaker } from "@/lib/types";
import { titleCase, getSpeakerImageUrl } from "@/lib/data";
import { Badge } from "./badge";
import { Link } from "./link";

interface EventCardProps {
  event: Event;
  speakers: Speaker[];
  venueName: string;
}

const colorForType: Record<string, "pink" | "indigo" | "green" | "teal" | "gray"> = {
  meetup: "pink",
  workshop: "indigo",
  webcast: "green",
  codelab: "teal",
};

export function EventCard({ event, speakers, venueName }: EventCardProps) {
  const isUpcoming = new Date(event.date) > new Date();

  return (
    <Link
      to={`/event/${event.name}`}
      className="block focus:ring-2 focus:ring-primary-500 rounded"
    >
      <div className="flex items-center justify-between">
        <Badge color={colorForType[event.type] ?? "gray"}>
          {titleCase(event.type)}
        </Badge>
        {isUpcoming && <Badge color="primary">Upcoming</Badge>}
      </div>
      <h3 className="text-2xl font-medium">{event.displayName}</h3>
      <p>
        {event.dateStr} {venueName && `@${venueName}`}
      </p>
      {speakers.length > 0 && (
        <div className="inline-flex group pt-1">
          {speakers
            .map((s) => ({ speaker: s, url: getSpeakerImageUrl(s) }))
            .filter((x) => x.url != null)
            .map(({ speaker, url }, index) => (
              <img
                key={speaker.id}
                src={url!}
                alt={speaker.name}
                title={speaker.name}
                width={40}
                height={40}
                className={`w-10 h-10 rounded-full shadow-sm transition-all ease-in-out duration-150 ${
                  index > 0 ? "-ml-2 group-hover:ml-1" : ""
                }`}
                loading="lazy"
              />
            ))}
        </div>
      )}
    </Link>
  );
}
