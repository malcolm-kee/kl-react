import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Container } from 'theme-ui';
import Layout from 'gatsby-theme-conference/src/components/layout';
import React from 'react';
import Seo from '../../components/seo';

const Note = ({
  data: {
    note: { body }
  },
  location: { pathname }
}) => (
  <>
    <Seo pathname={pathname} />
    <Layout>
      <Container>
        <MDXRenderer>{body}</MDXRenderer>
      </Container>
    </Layout>
  </>
);

export default Note;
