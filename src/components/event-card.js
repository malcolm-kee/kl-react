/** @jsx jsx */
import { graphql } from 'gatsby';
import { jsx, Styled } from 'theme-ui';
import { Card } from './card';
import { Link } from './link';

function UpcomingLabel() {
  return (
    <span
      sx={{
        fontSize: '12px',
        lineHeight: 2,
        verticalAlign: 'top',
        borderRadius: 4,
        backgroundColor: 'green',
        color: '#fff',
        p: 1,
      }}
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
  isMeetup,
  info,
  ...props
}) {
  const isUpcoming = status === 'upcoming';

  return (
    <Card {...props}>
      <Styled.h3>
        <Link
          isExternal={!isMeetup}
          to={isMeetup ? `/event/${info.id}` : link}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {name} {isUpcoming && <UpcomingLabel />}
        </Link>
      </Styled.h3>
      <Styled.ul sx={{ listStyle: 'none', p: 0 }}>
        <Styled.li sx={{ fontWeight: 'bold' }}>{dateTime}</Styled.li>
        <Styled.li>@{venueName}</Styled.li>
      </Styled.ul>
    </Card>
  );
}

export const query = graphql`
  fragment EventCard on MeetupEvent {
    id
    name
    status
    link
    dateTime(formatString: "ddd, DD MMM YYYY h:mm A")
    info {
      id
      type
      venue {
        name
      }
    }
    venue {
      name
    }
  }
`;
