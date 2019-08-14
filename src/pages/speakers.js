import { graphql } from 'gatsby';
import Speakers from 'gatsby-theme-conference/src/layouts/speakers';

export default Speakers;

export const pageQuery = graphql`
  query {
    allSpeakersYaml {
      edges {
        node {
          id
          name
          bio
          image
          company
          twitter
          github
          website
        }
      }
    }
  }
`;
