import React from 'react';
import { Container } from 'theme-ui';
import { Seo } from '../components/seo';
import { Layout } from '../components/layout';

const Note = ({ children }) => (
  <>
    <Seo />
    <Layout>
      <Container>{children}</Container>
    </Layout>
  </>
);

export default Note;
