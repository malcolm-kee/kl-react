/** @jsx jsx */
import { Link } from 'gatsby';
import { Container, jsx, Styled } from 'theme-ui';
import { FlexList } from './flex-list';
import { SectionHeading } from './section-heading';
import { SpeakerCard } from './speaker-card';

export const Speakers = ({ speakers = [], showMore, showPastEvents }) => (
  <Container>
    <SectionHeading>Speakers</SectionHeading>
    <FlexList
      sx={{
        justifyContent: 'center',
      }}
    >
      {speakers.map(speaker => (
        <SpeakerCard
          key={speaker.id}
          as="li"
          showPastEvents={showPastEvents}
          {...speaker}
        />
      ))}
    </FlexList>
    {showMore && (
      <div
        sx={{
          textAlign: 'center',
        }}
      >
        <Styled.a as={Link} to="/speakers">
          View speakers for previous meetups/workshops
        </Styled.a>
      </div>
    )}
  </Container>
);
