import { graphql } from 'gatsby';
import * as React from 'react';
import { Container } from './container';

export function CodelabSummary({ description }) {
  return (
    <Container className="prose-lg pb-10">
      {description && (
        <p className="text-2xl whitespace-pre-wrap">{description}</p>
      )}
    </Container>
  );
}

export const query = graphql`
  fragment CodelabSummary on EventYaml {
    description
  }
`;
