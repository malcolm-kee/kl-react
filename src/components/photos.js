/** @jsx jsx */
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { jsx } from 'theme-ui';
import { Container } from './container';
import { SectionHeading } from './section-heading';

export function Photos({ photos }) {
  return !photos.length ? null : (
    <Container>
      <SectionHeading>Photos</SectionHeading>
      <div>
        <ul
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
          {photos.map((photo) => (
            <li
              sx={{
                minWidth: 0,
              }}
              key={photo.id}
            >
              <Image fluid={photo.childImageSharp.fluid} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export const query = graphql`
  fragment EventPhoto on S3ImageAsset {
    id
    childImageSharp {
      fluid(maxWidth: 800) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`;
