import { MDXProvider } from '@mdx-js/react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Styled } from 'theme-ui';
import { Note } from '../components/note';
import { Seo } from '../components/seo';

const MDXComponents = {
  a: ({ href, children, ...props }) =>
    href && href[0] === '/' ? (
      <Styled.a as={Link} to={href} {...props}>
        {children}
      </Styled.a>
    ) : (
      <Styled.a
        href={href}
        target={href[0] !== '#' ? '_BLANK' : undefined}
        rel={href[0] !== '#' ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </Styled.a>
    ),
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
