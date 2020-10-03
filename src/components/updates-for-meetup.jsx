import * as React from 'react';
import { NLink } from './nav-link';
import { Updates } from './updates';

export const UpdatesForMeetup = ({ updates, meetupTitle, meetupId }) => {
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
};
