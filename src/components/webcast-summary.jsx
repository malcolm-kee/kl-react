import { graphql } from 'gatsby';
import * as React from 'react';
import { Container } from './container';

export function WebcastSummary({ description, takeaways }) {
  return (
    <Container className="prose-lg pb-10">
      {description && <p className="text-2xl">{description}</p>}
      {takeaways && (
        <div>
          <h2>In this webcast, you will learn</h2>
          <ul>
            {takeaways.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}

export const query = graphql`
  fragment WebcastSummary on EventYaml {
    description
    takeaways
  }
`;
