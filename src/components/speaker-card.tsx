import cx from "classnames";
import {
  FiGithub as GitHub,
  FiGlobe as Globe,
  FiLinkedin as LinkedIn,
  FiMic as Mic,
  FiTwitter as Twitter,
} from "react-icons/fi";
import type { Event, Speaker, Talk } from "@/lib/types";
import { isFilledArray, pluralize } from "@/lib/data";
import { BulletedList } from "./bulleted-list";
import { IconLink } from "./icon-link";
import { NLink } from "./nav-link";

interface SpeakerCardProps {
  speaker: Speaker;
  imageUrl: string | null;
  talks?: Talk[];
  workshops?: Event[];
  webcasts?: Event[];
  showPastEvents?: boolean;
  className?: string;
}

export function SpeakerCard({
  speaker,
  imageUrl,
  talks,
  workshops,
  webcasts,
  showPastEvents,
  className,
}: SpeakerCardProps) {
  return (
    <div
      id={speaker.id}
      className={cx("space-y-4 sm:flex sm:gap-6 sm:space-y-0", className)}
    >
      <div className="w-52 h-52 mx-auto md:w-80 md:h-full md:mx-0 flex-shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={speaker.name}
            className="w-full h-full max-h-96 object-cover object-center rounded-lg shadow-lg"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <Mic className="w-20 h-20" />
          </div>
        )}
      </div>
      <div
        className={cx(
          "flex-1 grid gap-3",
          showPastEvents && "md:grid-cols-2 md:gap-6"
        )}
      >
        <div>
          <h3 className="text-2xl font-medium">{speaker.name}</h3>
          {speaker.company && (
            <div className="text-xl">{speaker.company}</div>
          )}
          {speaker.bio && (
            <p className="prose my-2 text-gray-600">{speaker.bio}</p>
          )}
          <div className="-mx-2">
            {speaker.linkedin && (
              <IconLink href={speaker.linkedin}>
                <LinkedIn className="w-5 h-5" aria-hidden />
                <span className="sr-only">LinkedIn</span>
              </IconLink>
            )}
            {speaker.twitter && (
              <IconLink href={`https://twitter.com/${speaker.twitter}`}>
                <Twitter className="w-5 h-5" aria-hidden />
                <span className="sr-only">Twitter</span>
              </IconLink>
            )}
            {speaker.github && (
              <IconLink href={`https://github.com/${speaker.github}`}>
                <GitHub className="w-5 h-5" aria-hidden />
                <span className="sr-only">GitHub</span>
              </IconLink>
            )}
            {speaker.website && (
              <IconLink href={speaker.website}>
                <Globe className="w-5 h-5" aria-hidden />
                <span className="sr-only">Website</span>
              </IconLink>
            )}
          </div>
        </div>
        {showPastEvents && (
          <div>
            {isFilledArray(talks) && (
              <div>
                <h4 className="pt-1 pb-0.5 font-bold">
                  {pluralize("Talk", talks.length)} in React KL
                </h4>
                <BulletedList>
                  {talks.map((t, index) =>
                    index <= 2 ? (
                      <li key={t.id}>
                        <NLink to={`/talks#${t.id}`} primary>
                          {t.title}
                        </NLink>
                      </li>
                    ) : index === 3 ? (
                      <li key={t.id}>
                        And {talks.length - 3} other{" "}
                        {pluralize("talk", talks.length - 3)}
                      </li>
                    ) : null
                  )}
                </BulletedList>
              </div>
            )}
            {isFilledArray(webcasts) && (
              <div>
                <h4 className="pt-1 pb-0.5 font-bold">
                  {pluralize("Webcast", webcasts.length)} in React KL
                </h4>
                <BulletedList>
                  {webcasts.map((wcast, index) =>
                    index <= 2 ? (
                      <li key={wcast.name}>
                        <NLink to={`/event/${wcast.name}`} primary>
                          {wcast.displayName}
                        </NLink>
                      </li>
                    ) : index === 3 ? (
                      <li key={wcast.name}>
                        And {webcasts.length - 3} other{" "}
                        {pluralize("webcast", webcasts.length - 3)}
                      </li>
                    ) : null
                  )}
                </BulletedList>
              </div>
            )}
            {isFilledArray(workshops) && (
              <div>
                <h4 className="pt-1 pb-0.5 font-bold">
                  {pluralize("Workshop", workshops.length)} in React KL
                </h4>
                <BulletedList>
                  {workshops.map((wshop, index) =>
                    index <= 2 ? (
                      <li key={wshop.name}>
                        <NLink to={`/event/${wshop.name}`} primary>
                          {wshop.displayName}
                        </NLink>
                      </li>
                    ) : index === 3 ? (
                      <li key={wshop.name}>
                        And {workshops.length - 3} other{" "}
                        {pluralize("workshop", workshops.length - 3)}
                      </li>
                    ) : null
                  )}
                </BulletedList>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
