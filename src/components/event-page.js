/** @jsx jsx */
import { Styled, jsx, Container } from 'theme-ui';
import Layout from 'gatsby-theme-conference/src/components/layout';
import FlexList from 'gatsby-theme-conference/src/components/flex-list';
import Card from 'gatsby-theme-conference/src/components/card';

function EventCard({
  id,
  name,
  date,
  venueName,
  status,
  link,
  isMeetup,
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
      <Styled.h3
        as="a"
        href={link}
        sx={{
          color: isUpcoming ? 'secondary' : 'text',
          textDecoration: 'none',
        }}
      >
        {name}
      </Styled.h3>
      <Styled.ul sx={{ listStyle: 'none', p: 0 }}>
        <Styled.li sx={{ fontWeight: 'bold' }}>{date}</Styled.li>
        <Styled.li>{venueName}</Styled.li>
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
