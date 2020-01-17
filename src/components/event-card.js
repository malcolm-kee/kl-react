/** @jsx jsx */
import { graphql } from 'gatsby';
import { jsx, Styled } from 'theme-ui';
import { Card } from './card';
import { Link } from './link';

function UpcomingLabel({ className }) {
  return (
    <span
      sx={{
        display: 'inline-block',
        fontSize: '12px',
        lineHeight: 2,
        verticalAlign: 'top',
        borderRadius: 4,
        backgroundColor: 'accent',
        color: 'text',
        px: 1,
        my: 2,
      }}
      className={className}
    >
      Upcoming
    </span>
  );
}

export function EventCard({
  id,
  name,
  venueName,
  status,
  link,
  dateTime,
  info,
  ...props
}) {
  const isUpcoming = status === 'upcoming';

  return (
    <Card sx={{ px: 0 }} width={310} {...props}>
      <Styled.h3
        sx={{
          mb: 2,
        }}
      >
        <Link
          to={info ? `/event/${info.id}` : link}
          isExternal={!info}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {name} {isUpcoming && <UpcomingLabel />}
        </Link>
      </Styled.h3>
      <Styled.ul sx={{ listStyle: 'none', p: 0 }}>
        {info && info.instructor && (
          <Styled.li sx={{ fontWeight: 'bold', color: 'textLight' }}>
            by {info.instructor.map(i => i.name).join(', ')}
          </Styled.li>
        )}
        <Styled.li>
          {dateTime} {venueName && `@${venueName}`}
        </Styled.li>
      </Styled.ul>
    </Card>
  );
}

export const query = graphql`
  fragment EventCard on MeetupEvent {
    id
    name
    venueName
    status
    link
    dateTime(formatString: "ddd, DD MMM YYYY h:mm A")
    info {
      id
      instructor {
        name
      }
    }
  }
`;
