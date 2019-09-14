import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Note } from '../components/note';
import { Seo } from '../components/seo';

const NoteTemplate = ({ data, location }) => {
  const { frontmatter, body } = data.mdx;

  return (
    <>
      <Seo
        title={`${frontmatter.title} - React KL`}
        image={frontmatter.image && frontmatter.image.publicURL}
        pathname={location.pathname}
      />
      <Note title={frontmatter.title}>
        <MDXRenderer>{body}</MDXRenderer>
      </Note>
    </>
  );
};

export default NoteTemplate;

export const pageQuery = graphql`
  query MdxById($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        image {
          publicURL
        }
      }
      body
    }
  }
`;
