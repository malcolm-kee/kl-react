import { Link } from 'gatsby';
import React from 'react';
import { Container, Styled } from 'theme-ui';
import { Layout } from '../components/layout';
import { Seo } from '../components/seo';
import { TalkTopicForm } from '../components/talk-topic-form';

function SubmitTopic() {
  return (
    <>
      <Seo
        title="Submit A Talk Topic"
        description="Submit a talk topic that you interested"
      />
      <Layout>
        <Container>
          <Styled.h2 as="h1">Submit A Topic</Styled.h2>
          <Styled.p />
          <Styled.p>
            Let us know what you like to hear about in next meetup! We'll share
            this with anyone that interested to give a talk but doesn't have
            topic.
          </Styled.p>
          <Styled.p>
            If you would like to give the talk yourself,{' '}
            <Styled.a as={Link} to="/submit-a-talk">
              submit a talk
            </Styled.a>{' '}
            instead.
          </Styled.p>
          <TalkTopicForm />
        </Container>
      </Layout>
    </>
  );
}

export default SubmitTopic;
