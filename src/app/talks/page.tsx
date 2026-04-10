import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageTitle } from "@/components/page-title";
import { TalkCard } from "@/components/talk-card";
import {
  getAllTalks,
  getSpeakerById,
  getEventForTalk,
} from "@/lib/data";
import type { Speaker } from "@/lib/types";

export const metadata: Metadata = {
  title: "Talks",
  description: "Previous talks in KL React",
};

export default function TalksPage() {
  const talks = [...getAllTalks()].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <Container>
      <PageTitle>Talks</PageTitle>
      <p className="mb-8 text-gray-500">{"/* in alphabetical order */"}</p>
      <ul>
        {talks.map((talk) => {
          const speakers = talk.speakers
            .map((id) => getSpeakerById(id))
            .filter((s): s is Speaker => s != null);
          const event = getEventForTalk(talk.id);

          return (
            <li key={talk.id}>
              <article className="mb-5 hover:bg-gray-100 px-2 -mx-2 py-3 sm:px-4 sm:-mx-4">
                <TalkCard talk={talk} speakers={speakers} event={event} />
              </article>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
