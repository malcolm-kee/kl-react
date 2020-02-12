/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { Container } from './container';
import { EventCard } from './event-card';
import { FlexList } from './flex-list';
import { Layout } from './layout';

export function EventPage({ events }) {
  return (
    <Layout>
      <Container>
        <Styled.h1
          sx={{
            mb: [3, 5],
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
                my: 3,
                pr: 2,
                pl: [2, 0],
                mx: [0, 2, 3],
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
