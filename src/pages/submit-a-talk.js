import React from 'react';
import { Container, Styled } from 'theme-ui';
import { Layout } from '../components/layout';
import { Seo } from '../components/seo';
import { SubmitTalkForm } from '../components/submit-talk-form';

function SubmitATalk() {
  return (
    <>
      <Seo
        title="Submit A Talk"
        description="Submit a talk to speak at next React KL meetup"
      />
      <Layout>
        <Container>
          <Styled.h2 as="h1">Submit A Talk</Styled.h2>
          <Styled.p />
          <Styled.p>
            Register your interest to give a talk at React KL Meetup!
          </Styled.p>
          <Styled.p>
            The topic of your talk does not necessarily be related to React JS
            itself, but it must be targeted at React JS developers. For
            instance, it's fine to give talk tools/patterns in Angular, but you
            should make it relevant, e.g. compare it with React, or how it could
            be applied when writing React code.
          </Styled.p>
          <SubmitTalkForm />
        </Container>
      </Layout>
    </>
  );
}

export default SubmitATalk;
