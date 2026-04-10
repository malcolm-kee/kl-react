import type { Event, Speaker, Talk } from "@/lib/types";
import { getSpeakerImageUrl } from "@/lib/data";
import { NLink } from "./nav-link";
import { SpeakerCard } from "./speaker-card";

interface SpeakersProps {
  speakers: Speaker[];
  showMore?: boolean;
  showPastEvents?: boolean;
  talks?: Map<string, Talk[]>;
  workshops?: Map<string, Event[]>;
  webcasts?: Map<string, Event[]>;
}

export function Speakers({
  speakers,
  showMore,
  showPastEvents,
  talks,
  workshops,
  webcasts,
}: SpeakersProps) {
  return (
    <>
      {speakers.length > 0 ? (
        <ul className="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8">
          {speakers.map((speaker) => (
            <li className="sm:py-8" key={speaker.id}>
              <SpeakerCard
                speaker={speaker}
                imageUrl={getSpeakerImageUrl(speaker, "lg")}
                showPastEvents={showPastEvents}
                talks={talks?.get(speaker.id)}
                workshops={workshops?.get(speaker.id)}
                webcasts={webcasts?.get(speaker.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-6 text-2xl">To be announced</p>
      )}
      {showMore && (
        <div className="my-12 text-center lg:text-left">
          <NLink to="/speakers" primary className="text-xl">
            View speakers for previous meetups/workshops
          </NLink>
        </div>
      )}
    </>
  );
}
