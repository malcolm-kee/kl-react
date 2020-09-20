/** @jsx jsx */

import { graphql } from 'gatsby';
import { jsx } from 'theme-ui';
import { NLink } from './nav-link';
import { TalkMaterialIcons } from './talk-material-icons';

export const Talk = ({ talk }) => (
  <div id={talk.id} key={talk.id}>
    <div className="mb-3 md:flex md:justify-between md:items-center">
      <h3 className="text-2xl font-medium">{talk.title}</h3>
      <p>
        by{' '}
        <NLink
          to={`/speakers/#${talk.speaker.id}`}
          className="text-primary-600"
        >
          {talk.speaker.name}
        </NLink>{' '}
        on{' '}
        <NLink to={`/event/${talk.event.id}`} className="text-primary-600">
          {talk.event.meetup.dateTime}
        </NLink>
      </p>
    </div>
    <div className="md:flex md:justify-between">
      <p className="mb-3 max-w-2xl text-justify">{talk.description}</p>
      <div className="flex-shrink-0">
        {talk.materials &&
          talk.materials.map((material, i) => (
            <TalkMaterialIcons
              type={material.type}
              url={material.url}
              key={i}
            />
          ))}
      </div>
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
