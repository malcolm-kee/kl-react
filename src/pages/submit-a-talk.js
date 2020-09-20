import * as React from 'react';
import { Article } from '../components/article';
import { Aside } from '../components/aside';
import { Layout } from '../components/layout';
import { NLink } from '../components/nav-link';
import { PageTitle } from '../components/page-title';
import { Seo } from '../components/seo';
import { SubmitTalkForm } from '../components/submit-talk-form';

function SubmitATalk() {
  return (
    <>
      <Seo
        title="Submit A Talk"
        description="Submit a talk to speak at next React KL meetup"
      />
      <Layout className="bg-gradient-to-b from-gray-100 to-gray-50">
        <Article>
          <PageTitle>Submit A Talk</PageTitle>
          <p>
            Register your interest to give a talk at React KL Meetup! If you
            doesn't want to give talk but interested to hear about a topic,{' '}
            <NLink to="/submit-topic" className="text-primary-700">
              submit a topic
            </NLink>{' '}
            instead.
          </p>
          <p>
            The topic of your talk does not necessarily be related to React
            itself, but it must be targeted at React developers. For instance,
            it's fine to give talk tools/patterns in Angular, but you should
            make it relevant, e.g. compare it with React, or how it could be
            applied when writing React code.
          </p>
          <Aside>
            <div>
              If you interested to give a talk but doesn't have a topic in mind,
              just put <em>"Need suggestion"</em> in the "Talk Title" and "Talk
              Description" fields. We'll contact you to brainstorm on the topic
              together.
            </div>
          </Aside>
          <div className="py-3">
            <SubmitTalkForm />
          </div>
        </Article>
      </Layout>
    </>
  );
}

export default SubmitATalk;
