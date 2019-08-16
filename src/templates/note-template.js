import React from 'react';
import { Container } from 'theme-ui';
import { Seo } from '../components/seo';
import { Layout } from '../components/layout';

const NoteTemplate = ({ children, pageContext = {} }) => {
  const { frontmatter } = pageContext;

  return (
    <>
      <Seo title={frontmatter && frontmatter.title} />
      <Layout>
        <Container>{children}</Container>
      </Layout>
    </>
  );
};

export default NoteTemplate;
