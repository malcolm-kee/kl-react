import {
  FiCoffee as Coffee,
  FiHome as Home,
  FiInfo as Info,
  FiPlusSquare as PlusSquare,
  FiRadio as Radio,
  FiUsers as Users,
} from "react-icons/fi";
import type { ResolvedScheduleItem } from "@/lib/types";
import { Link } from "./link";
import { NLink } from "./nav-link";
import { TalkMaterialIcons } from "./talk-material-icons";

const IconMap: Record<
  string,
  { Component: React.ComponentType<{ className?: string }>; label: string }
> = {
  food: { Component: Coffee, label: "Food" },
  networking: { Component: Users, label: "Networking" },
  announcement: { Component: Info, label: "Shout out" },
  home: { Component: Home, label: "End" },
  clinic: { Component: PlusSquare, label: "React Clinic" },
  news: { Component: Radio, label: "This Month on React" },
};

function ScheduleTypeDisplay({ type }: { type: string }) {
  const Icon = IconMap[type];

  return (
    <div className="flex-none w-[60%] sm:w-[250px] py-2 pr-0 sm:pr-2 text-right sm:text-left">
      {Icon ? (
        <h4 className="text-lg inline-flex items-center">
          <Icon.Component className="mr-2 text-gray-500" />{" "}
          <span className="hidden lg:inline">{Icon.label}</span>
        </h4>
      ) : (
        <h4 className="text-lg inline-flex items-center">{type}</h4>
      )}
    </div>
  );
}

interface ScheduleItemProps extends ResolvedScheduleItem {
  speakersOnSamePage?: boolean;
}

export function ScheduleItem({
  time,
  type,
  talk,
  desc,
  speakersOnSamePage,
}: ScheduleItemProps) {
  const isTalk = type === "talk";

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-baseline py-2 sm:py-3">
      <div className="flex-none w-[40%] sm:w-32">
        <h3 className="text-lg font-semibold">{time}</h3>
      </div>
      {isTalk ? (
        talk ? (
          <div className="flex-none w-[60%] sm:w-[250px] py-2 pr-0 sm:pr-2 text-right sm:text-left">
            <h4 className="text-lg font-semibold">{talk.title}</h4>
            {talk.speakers.length > 0 && (
              <ul>
                {talk.speakers.map((speaker) => (
                  <li key={speaker.id}>
                    {speakersOnSamePage ? (
                      <a
                        href={`#${speaker.id}`}
                        className="text-primary-700 hover:underline"
                      >
                        {speaker.name}
                      </a>
                    ) : (
                      <NLink to={`/speakers#${speaker.id}`} primary>
                        {speaker.name}
                      </NLink>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="flex-none w-[60%] sm:w-[250px] py-2 pr-0 sm:pr-2 text-right sm:text-left">
            <h4 className="text-lg font-semibold">TBD</h4>
          </div>
        )
      ) : (
        <ScheduleTypeDisplay type={type} />
      )}
      <div className="w-full">
        {isTalk ? (
          talk ? (
            <>
              {talk.description && (
                <p className="whitespace-pre-wrap my-0 text-justify sm:text-left">
                  {talk.description}
                </p>
              )}
              {talk.materials && (
                <ul className="flex flex-wrap my-1">
                  {talk.materials.map((material, i) => (
                    <li key={i} className="mr-1">
                      <TalkMaterialIcons
                        type={material.type}
                        url={material.url}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className="whitespace-pre-wrap my-0 text-justify sm:text-left">
              TBD is the shorthand for To Be Determined, in case you don&apos;t
              know.
            </p>
          )
        ) : type === "clinic" ? (
          <p className="whitespace-pre-wrap my-0 text-justify sm:text-left">
            Get/give diagnosis of your code that is causing you headache.{" "}
            <Link to="/react-clinic">More details.</Link>
          </p>
        ) : (
          <p className="whitespace-pre-wrap my-0 text-justify sm:text-left">
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}
