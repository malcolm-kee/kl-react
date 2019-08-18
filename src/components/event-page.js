/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui';
import { EventCard } from './event-card';
import { FlexList } from './flex-list';
import { Layout } from './layout';

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
            <EventCard
              key={event.id}
              as="li"
              sx={{
                m: 2,
                flexGrow: 1,
              }}
              {...event}
            />
          ))}
        </FlexList>
      </Container>
    </Layout>
  );
}
