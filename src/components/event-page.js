/** @jsx jsx */
import { Styled, jsx, Container } from 'theme-ui';
import { Layout } from './layout';
import { FlexList } from './flex-list';
import { Card } from './card';
import { Link } from './link';

function EventCard({
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
    <Card
      sx={{
        m: 2,
        flexGrow: 1,
      }}
      {...props}
    >
      <Styled.h3>
        <Link
          isExternal={!isMeetup}
          to={isMeetup ? `/event/${info.id}` : link}
          sx={{
            color: isUpcoming ? 'secondary' : 'text',
            textDecoration: 'none',
          }}
        >
          {name}
        </Link>
      </Styled.h3>
      <Styled.ul sx={{ listStyle: 'none', p: 0 }}>
        <Styled.li sx={{ fontWeight: 'bold' }}>{dateTime}</Styled.li>
        <Styled.li>@{venueName}</Styled.li>
      </Styled.ul>
    </Card>
  );
}

export function EventPage({ events }) {
  return (
    <Layout>
      <Container>
        <Styled.h1
          sx={{
            mb: 5,
          }}
        >
          Events
        </Styled.h1>
        <FlexList
          sx={{
            justifyContent: 'center',
          }}
        >
          {events.map(event => (
            <EventCard key={event.id} as="li" {...event} />
          ))}
        </FlexList>
      </Container>
    </Layout>
  );
}
