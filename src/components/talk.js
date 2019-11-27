/** @jsx jsx */

import { graphql } from 'gatsby';
import { jsx, Styled } from 'theme-ui';
import { Link } from './link';
import { TalkMaterialIcons } from './talk-material-icons';

export const Talk = ({ talk }) => (
  <div id={talk.id} key={talk.id}>
    <Styled.h3>{talk.title}</Styled.h3>
    <Styled.p sx={{ mb: 2 }}>
      by <Link to={`/speakers/#${talk.speaker.id}`}>{talk.speaker.name}</Link>{' '}
      on{' '}
      <Link to={`/event/${talk.event.id}`}>{talk.event.meetup.dateTime}</Link>
    </Styled.p>
    <Styled.p sx={{ mb: 2 }}>{talk.description}</Styled.p>
    <div sx={{ mb: 5 }}>
      {talk.materials &&
        talk.materials.map((material, i) => (
          <TalkMaterialIcons type={material.type} url={material.url} key={i} />
        ))}
    </div>
  </div>
);

export const query = graphql`
  fragment Talk on TalkYaml {
    id
    title
    description
    speaker {
      id
      name
    }
    materials {
      type
      url
    }
    event {
      id
      meetup {
        dateTime(formatString: "DD MMM YYYY")
      }
    }
  }
`;
