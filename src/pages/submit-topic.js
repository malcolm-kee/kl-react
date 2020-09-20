import * as React from 'react';
import { Article } from '../components/article';
import { Layout } from '../components/layout';
import { NLink } from '../components/nav-link';
import { PageTitle } from '../components/page-title';
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
        <Article>
          <PageTitle>Submit A Topic</PageTitle>
          <p>
            Let us know what you like to hear about in next meetup! We'll share
            this with anyone that interested to give a talk but doesn't have
            topic.
          </p>
          <p>
            If you would like to give the talk yourself,{' '}
            <NLink to="/submit-a-talk" className="text-primary-500">
              submit a talk
            </NLink>{' '}
            instead.
          </p>
          <TalkTopicForm />
        </Article>
      </Layout>
    </>
  );
}

export default SubmitTopic;
