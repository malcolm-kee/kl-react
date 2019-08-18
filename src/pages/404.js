import React from 'react';
import { Container, Styled } from 'theme-ui';
import { Layout } from '../components/layout';
import { Seo } from '../components/seo';

function PageNotFound() {
  return (
    <>
      <Seo title="Page Not Found" />
      <Layout>
        <Container>
          <Styled.h2 as="h1">Page Not Found</Styled.h2>
          <Styled.p />
          <Styled.p>A 404, if you speak Http.</Styled.p>
          <Styled.p>This is probably our fault, we're sorry.</Styled.p>
        </Container>
      </Layout>
    </>
  );
}

export default PageNotFound;
