/** @jsx jsx */
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { GitHub, Globe, Twitter } from 'react-feather';
import { Flex, jsx, Styled } from 'theme-ui';
import { BackgroundImage } from './background-image';
import { Card } from './card';
import { IconLink } from './icon-link';

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
    </Card>
  );
}

export const query = graphql`
  fragment SpeakerCard on SpeakersYaml {
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
  }
`;
