/** @jsx jsx */
import BackgroundImage from 'gatsby-theme-conference/src/components/background-image';
import Card from 'gatsby-theme-conference/src/components/card';
import IconLink from 'gatsby-theme-conference/src/components/icon-link';
import { GitHub, Twitter, Globe } from 'react-feather';
import { Flex, jsx, Styled } from 'theme-ui';

export default ({
  id,
  name,
  image,
  bio,
  company,
  twitter,
  github,
  website,
  ...props
}) => (
  <Card {...props}>
    <BackgroundImage
      src={image}
      sx={{
        mb: 3,
      }}
    />
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
