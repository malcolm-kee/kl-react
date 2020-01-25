/* eslint-disable react/jsx-no-comment-textnodes */
/** @jsx jsx */

import { jsx, Styled } from 'theme-ui';
import { Container } from './container';
import { Talk } from './talk';

export function Talks({ talks }) {
  return (
    <Container>
      <Styled.h1>Talks</Styled.h1>
      <p sx={{ mb: 5, color: 'textLight' }}>/* in alphabetical order */</p>
      {talks.map(talk => (
        <Talk talk={talk} key={talk.id} />
      ))}
    </Container>
  );
}
