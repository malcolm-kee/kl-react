import * as React from 'react';
import { ScheduleItem } from './schedule-item';

export function Schedule({ schedule, speakersOnSamePage }) {
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
