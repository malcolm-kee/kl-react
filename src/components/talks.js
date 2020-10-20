import * as React from 'react';
import { Container } from './container';
import { PageTitle } from './page-title';
import { Talk } from './talk';

export function Talks({ talks }) {
  return (
    <Container>
      <PageTitle>Talks</PageTitle>
      <p className="mb-8 text-gray-500">{'/* in alphabetical order */'}</p>
      <ul>
        {talks.map((talk) => (
          <li key={talk.id}>
            <article className="mb-5 hover:bg-gray-100 px-2 -mx-2 py-3 sm:px-4 sm:-mx-4">
              <Talk talk={talk} />
            </article>
          </li>
        ))}
      </ul>
    </Container>
  );
}
