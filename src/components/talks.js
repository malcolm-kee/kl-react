/** @jsx jsx */

import { Container, jsx, Styled } from 'theme-ui';
import { Talk } from './talk';

export function Talks({ talks }) {
  return (
    <Container>
      <Styled.h1>Talks</Styled.h1>
      <p sx={{ mb: 5 }}>in alphabetical order</p>
      {talks.map(talk => (
        <Talk talk={talk} key={talk.id} />
      ))}
    </Container>
  );
}
