import * as React from 'react';
import { Container } from './container';
import { EventCard } from './event-card';
import { Layout } from './layout';
import { PageTitle } from './page-title';

export function EventPage({ events }) {
  return (
    <Layout>
      <Container>
        <PageTitle>Events</PageTitle>
        <div className="mt-12 border-t-2 border-gray-300 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {events.map((event) => (
              <EventCard {...event} key={event.id} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}
