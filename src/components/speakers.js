/** @jsx jsx */
import { Link } from 'gatsby';
import { Container, jsx, Styled } from 'theme-ui';
import { FlexList } from './flex-list';
import { SectionHeading } from './section-heading';
import { SpeakerCard } from './speaker-card';

export const Speakers = ({
  speakers,
  showMore,
  showPastEvents,
  title = 'Speakers',
}) => (
  <Container>
    <SectionHeading>{title}</SectionHeading>
    {speakers && speakers.length > 1 && (
      <p sx={{ textAlign: 'center', mt: 0 }}>in alphabetical order</p>
    )}
    {speakers && speakers.length > 0 ? (
      <FlexList
        sx={{
          justifyContent: 'center',
        }}
      >
        {speakers.map(speaker => (
          <SpeakerCard
            key={speaker.id}
            as="li"
            sx={{ mb: 4 }}
            showPastEvents={showPastEvents}
            {...speaker}
          />
        ))}
      </FlexList>
    ) : (
      <Styled.h3 as="p" sx={{ textAlign: 'center', m: 3 }}>
        To be announced
      </Styled.h3>
    )}
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
