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
import { SrOnly } from './sr-only';

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
    <Card id={id} {...props}>
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
            <SrOnly>Twitter</SrOnly>
          </IconLink>
        )}
        {github && (
          <IconLink href={`https://github.com/${github}`}>
            <GitHub />
            <SrOnly>GitHub</SrOnly>
          </IconLink>
        )}
        {website && (
          <IconLink href={website}>
            <Globe />
            <SrOnly>Website</SrOnly>
          </IconLink>
        )}
      </Flex>
      {showPastEvents && isFilledArray(talk) && (
        <div>
          <Styled.h4 sx={{ pt: 2, pb: 1 }}>
            {pluralize('Talk', talk.length)} in React KL
          </Styled.h4>
          <BulletedList>
            {/* we only shows 3 talks, remaining just a count */}
            {talk.map((t, index) =>
              index <= 2 ? (
                <li key={t.id}>{t.title}</li>
              ) : index === 3 ? (
                <li key={t.id}>
                  And {talk.length - 3} other{' '}
                  {pluralize('talk', talk.length - 3)}
                </li>
              ) : null
            )}
          </BulletedList>
        </div>
      )}
      {showPastEvents && isFilledArray(workshop) && (
        <div>
          <Styled.h4 sx={{ pt: 2, pb: 1 }}>
            {pluralize('Workshop', workshop.length)} in React KL
          </Styled.h4>
          <BulletedList>
            {/* we only shows 3 workshops, remaining just a count */}
            {workshop.map((wshop, index) =>
              index <= 2 ? (
                <li key={wshop.id}>{wshop.meetup.name}</li>
              ) : index === 3 ? (
                <li key={wshop.id}>
                  And {workshop.length - 3} other{' '}
                  {pluralize('workshop', workshop.length - 3)}
                </li>
              ) : null
            )}
          </BulletedList>
        </div>
      )}
    </Card>
  );
}

const pluralize = (singular, count) => (count > 1 ? `${singular}s` : singular);

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
