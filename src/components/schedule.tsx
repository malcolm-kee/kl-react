import type { ResolvedScheduleItem } from "@/lib/types";
import { ScheduleItem } from "./schedule-item";

interface ScheduleProps {
  schedule: ResolvedScheduleItem[];
  speakersOnSamePage?: boolean;
}

export function Schedule({ schedule, speakersOnSamePage }: ScheduleProps) {
  return (
    <ul className="-my-4">
      {schedule.map((item) => (
        <li key={item.time}>
          <ScheduleItem {...item} speakersOnSamePage={speakersOnSamePage} />
        </li>
      ))}
    </ul>
  );
}
