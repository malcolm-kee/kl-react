import React from 'react';
import { Container, Styled } from 'theme-ui';
import { Layout } from '../components/layout';
import { Seo } from '../components/seo';

function TopicSubmitted() {
  return (
    <>
      <Seo title="Topic Submitted" />
      <Layout>
        <Container>
          <Styled.h2 as="h1">Topic Submitted</Styled.h2>
          <Styled.p />
          <Styled.p>Thank you for submitting the topic.</Styled.p>
        </Container>
      </Layout>
    </>
  );
}

export default TopicSubmitted;
