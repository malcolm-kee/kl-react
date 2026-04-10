import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageTitle } from "@/components/page-title";
import { SpeakerCard } from "@/components/speaker-card";
import {
  getAllSpeakers,
  getSpeakerImageUrl,
  getTalksForSpeaker,
  getWorkshopsForSpeaker,
  getWebcastsForSpeaker,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Speakers",
  description: "Speakers that had given talk or workshop in KL React",
};

export default function SpeakersPage() {
  const speakers = [...getAllSpeakers()].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Container>
      <PageTitle>Speakers</PageTitle>
      {speakers.length > 1 && (
        <p className="mb-8 text-gray-500">{"/* in alphabetical order */"}</p>
      )}
      <ul className="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8">
        {speakers.map((speaker) => (
          <li className="sm:py-8" key={speaker.id}>
            <SpeakerCard
              speaker={speaker}
              imageUrl={getSpeakerImageUrl(speaker, "lg")}
              talks={getTalksForSpeaker(speaker.id)}
              workshops={getWorkshopsForSpeaker(speaker.id)}
              webcasts={getWebcastsForSpeaker(speaker.id)}
              showPastEvents
            />
          </li>
        ))}
      </ul>
    </Container>
  );
}
