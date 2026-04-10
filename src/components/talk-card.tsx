import type { Event, Speaker, Talk } from "@/lib/types";
import { getSpeakerImageUrl } from "@/lib/data";
import { NLink } from "./nav-link";
import { TalkMaterialIcons } from "./talk-material-icons";

interface TalkCardProps {
  talk: Talk;
  speakers: Speaker[];
  event?: Event;
}

export function TalkCard({ talk, speakers, event }: TalkCardProps) {
  return (
    <div id={talk.id}>
      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h3 className="text-2xl font-medium">{talk.title}</h3>
          {event && (
            <NLink
              to={`/event/${event.name}`}
              className="text-sm leading-5 text-gray-500 hover:underline"
            >
              {event.dateStr}
            </NLink>
          )}
        </div>
        <div className="inline-flex items-center lg:flex-row-reverse">
          {speakers.map((speaker) => {
            const imageUrl = getSpeakerImageUrl(speaker);
            return (
              <span key={speaker.id} className="inline-flex items-center">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full mr-3 lg:ml-3"
                    loading="lazy"
                  />
                )}
                <p className="text-left lg:text-right">
                  <NLink
                    to={`/speakers#${speaker.id}`}
                    className="text-sm leading-5 font-medium text-gray-900 hover:underline"
                  >
                    {speaker.name}
                  </NLink>
                </p>
              </span>
            );
          })}
        </div>
      </div>
      <div className="lg:flex lg:justify-between">
        {talk.description && (
          <p className="mb-3 max-w-2xl text-justify whitespace-pre-wrap">
            {talk.description}
          </p>
        )}
        <div className="flex-shrink-0">
          {talk.materials?.map((material, i) => (
            <TalkMaterialIcons
              type={material.type}
              url={material.url}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
