import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import * as React from 'react';
import { Link } from '../components/link';
import { Note } from '../components/note';
import { Seo } from '../components/seo';

const MDXComponents = {
  a: ({ href, ...props }) => <Link {...props} to={href} />,
};

const NoteTemplate = ({ data, location }) => {
  const { frontmatter, body } = data.mdx;

  return (
    <>
      <Seo
        title={`${frontmatter.title} - React KL`}
        image={frontmatter.image && frontmatter.image.publicURL}
        description={frontmatter.description}
        pathname={location.pathname}
      />
      <Note title={frontmatter.title}>
        <MDXProvider components={MDXComponents}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
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
