import * as React from 'react';
import { Styled } from 'theme-ui';
import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { Seo } from '../components/seo';

function TalkSubmitted() {
  return (
    <>
      <Seo title="Talk Submitted" />
      <Layout>
        <Container>
          <Styled.h2 as="h1">Talk Submitted</Styled.h2>
          <Styled.p />
          <Styled.p>Thank you for register to be a speaker.</Styled.p>
          <Styled.p>
            We'll be in touch with you if your talk is selected!
          </Styled.p>
        </Container>
      </Layout>
    </>
  );
}

export default TalkSubmitted;
