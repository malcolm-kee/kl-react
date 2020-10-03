import * as React from 'react';
import { NLink } from './nav-link';
import { SpeakerCard } from './speaker-card';

export const Speakers = ({ speakers, showMore, showPastEvents }) => (
  <React.Fragment>
    {speakers && speakers.length > 0 ? (
      <ul className="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8">
        {speakers.map((speaker) => (
          <li className="sm:py-8" key={speaker.id}>
            <SpeakerCard showPastEvents={showPastEvents} {...speaker} />
          </li>
        ))}
      </ul>
    ) : (
      <p className="mb-6 text-2xl">To be announced</p>
    )}
    {showMore && (
      <div>
        <NLink to="/speakers" primary className="text-xl">
          View speakers for previous meetups/workshops
        </NLink>
      </div>
    )}
  </React.Fragment>
);
