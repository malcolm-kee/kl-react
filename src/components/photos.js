/** @jsx jsx */
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Container, jsx } from 'theme-ui';
import { List } from './list';
import { SectionHeading } from './section-heading';

export function Photos({ photos }) {
  return (
    <Container>
      <SectionHeading>Photos</SectionHeading>
      <div>
        <List
          sx={{
            display: 'grid',
            my: 4,
            gridGap: 2,
            gridTemplateColumns: [
              undefined,
              'repeat(auto-fill, minmax(400px, 1fr))',
            ],
          }}
        >
          {photos.map(photo => (
            <li
              sx={{
                minWidth: 0,
              }}
              key={photo.id}
            >
              <Image fluid={photo.childImageSharp.fluid} />
            </li>
          ))}
        </List>
      </div>
    </Container>
  );
}

export const query = graphql`
  fragment EventPhoto on File {
    id
    childImageSharp {
      fluid(maxWidth: 800) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`;
