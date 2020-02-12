/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from './link';
import { SectionHeading } from './section-heading';
import { Updates } from './updates';

export const UpdatesForMeetup = ({ updates, meetupTitle, meetupId }) => {
  return (
    <section
      sx={{
        boxShadow: 5,
        p: 4,
      }}
    >
      <SectionHeading>
        <Link to={`/event/${meetupId}`}>{meetupTitle}</Link>
      </SectionHeading>
      <div>
        <Updates updates={updates} />
      </div>
    </section>
  );
};
