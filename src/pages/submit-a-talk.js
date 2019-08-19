import { Link } from 'gatsby';
import React from 'react';
import { Container, Styled } from 'theme-ui';
import { Aside } from '../components/aside';
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
            Register your interest to give a talk at React KL Meetup! If you
            doesn't want to give talk but interested to hear about a topic,{' '}
            <Styled.a as={Link} to="/submit-topic">
              submit a topic
            </Styled.a>{' '}
            instead.
          </Styled.p>
          <Styled.p>
            The topic of your talk does not necessarily be related to React
            itself, but it must be targeted at React developers. For instance,
            it's fine to give talk tools/patterns in Angular, but you should
            make it relevant, e.g. compare it with React, or how it could be
            applied when writing React code.
          </Styled.p>
          <Aside>
            <Styled.p>
              If you interested to give a talk but doesn't have a topic in mind,
              just put <em>"Need suggestion"</em> in the "Talk Title" and "Talk
              Description" fields. We'll contact you to brainstorm on the topic
              together.
            </Styled.p>
          </Aside>
          <SubmitTalkForm />
        </Container>
      </Layout>
    </>
  );
}

export default SubmitATalk;
