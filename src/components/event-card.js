/** @jsx jsx */
import { graphql } from 'gatsby';
import { ExternalLink } from 'react-feather';
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
        backgroundColor: 'accent',
        color: 'text',
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
        {info && info.instructor && (
          <Styled.li sx={{ fontWeight: 'bold' }}>
            by {info.instructor.map(i => i.name).join(', ')}
          </Styled.li>
        )}
        <Styled.li>
          {dateTime} {venueName && `@${venueName}`}
        </Styled.li>
        {info && info.site && (
          <Styled.li>
            <Link
              href={info.site}
              isExternal
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: '#555',
              }}
            >
              Site <ExternalLink sx={{ ml: 1 }} />
            </Link>
          </Styled.li>
        )}
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
    isMeetup
    info {
      id
      site
      instructor {
        name
      }
    }
  }
`;
