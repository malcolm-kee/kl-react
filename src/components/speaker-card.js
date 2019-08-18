/** @jsx jsx */
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { GitHub, Globe, Twitter } from 'react-feather';
import { Flex, jsx, Styled } from 'theme-ui';
import { isFilledArray } from '../lib';
import { BackgroundImage } from './background-image';
import { Card } from './card';
import { IconLink } from './icon-link';
import { BulletedList } from './bulleted-list';

/**
 *
 * @param {Object} props
 * @param {boolean} showPastEvents should show previous talks and workshops in React KL
 */
export function SpeakerCard({
  id,
  name,
  image,
  imageFile,
  bio,
  company,
  twitter,
  github,
  website,
  talk,
  workshop,
  showPastEvents,
  ...props
}) {
  return (
    <Card {...props}>
      {imageFile ? (
        <Image fluid={imageFile.childImageSharp.fluid} sx={{ mb: 3 }} />
      ) : (
        <BackgroundImage
          src={image}
          sx={{
            mb: 3,
          }}
        />
      )}
      <Styled.h3>{name}</Styled.h3>
      <Styled.div
        sx={{
          fontSize: 1,
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        {company}
      </Styled.div>
      <Styled.p
        sx={{
          mb: 0,
          textAlign: 'justify',
          whiteSpace: 'pre-wrap',
        }}
      >
        {bio}
      </Styled.p>

      <Flex mx={-2}>
        {twitter && (
          <IconLink href={`https://twitter.com/${twitter}`}>
            <Twitter />
          </IconLink>
        )}
        {github && (
          <IconLink href={`https://github.com/${github}`}>
            <GitHub />
          </IconLink>
        )}
        {website && (
          <IconLink href={website}>
            <Globe />
          </IconLink>
        )}
      </Flex>
      {showPastEvents && isFilledArray(talk) && (
        <div>
          <Styled.h4 sx={{ pt: 2, pb: 1 }}>Talk(s) in React KL</Styled.h4>
          <BulletedList>
            {talk.map(t => (
              <li key={t.id}>{t.title}</li>
            ))}
          </BulletedList>
        </div>
      )}
      {showPastEvents && isFilledArray(workshop) && (
        <div>
          <Styled.h4 sx={{ pt: 2, pb: 1 }}>Workshop(s) in React KL</Styled.h4>
          <BulletedList>
            {workshop.map(w => (
              <li key={w.id}>{w.meetup.name}</li>
            ))}
          </BulletedList>
        </div>
      )}
    </Card>
  );
}

export const query = graphql`
  fragment SpeakerCard on SpeakerYaml {
    id
    name
    bio
    image
    imageFile {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    company
    twitter
    github
    website
    talk {
      id
      title
    }
    workshop {
      id
      meetup {
        name
      }
    }
  }
`;
