/** @jsx jsx */

import { graphql } from 'gatsby';
import { jsx } from 'theme-ui';
import { NLink } from './nav-link';
import { TalkMaterialIcons } from './talk-material-icons';
import Image from 'gatsby-image';

export const Talk = ({ talk }) => (
  <div id={talk.id} key={talk.id}>
    <div className="mb-3 lg:flex lg:justify-between lg:items-center">
      <h3 className="text-2xl font-medium">{talk.title}</h3>
      <div className="inline-flex items-center lg:flex-row-reverse">
        {talk.speaker.imageFile && (
          <Image
            fixed={talk.speaker.imageFile.childImageSharp.fixed}
            className="rounded-full mr-3 lg:ml-3"
            alt=""
          />
        )}
        <p className="text-left lg:text-right">
          <NLink
            to={`/speakers/#${talk.speaker.id}`}
            className="text-sm leading-5 font-medium text-gray-900 hover:underline"
          >
            {talk.speaker.name}
          </NLink>
          <br />
          <NLink
            to={`/event/${talk.event.id}`}
            className="text-sm leading-5 text-gray-500 hover:underline"
          >
            {talk.event.meetup.dateTime}
          </NLink>
        </p>
      </div>
    </div>
    <div className="lg:flex lg:justify-between">
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
      imageFile {
        childImageSharp {
          fixed(width: 40) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
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
