import * as React from 'react';
import { isFilledArray } from '../lib';
import { SectionHeading } from './section-heading';
import { Update } from './update';

export const Updates = ({ updates, title }) => {
  if (!isFilledArray(updates)) {
    return null;
  }

  return (
    <React.Fragment>
      {title && <SectionHeading>{title}</SectionHeading>}
      <ul>
        {updates.map((update, i) => (
          <li key={i}>
            <Update {...update} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};
