/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Button } from './button';
import { Field } from './field';

export const TalkTopicForm = () => (
  <form
    name="talk-topic-form"
    method="POST"
    action="/topic-submitted"
    netlify-honeypot="trap"
    data-netlify="true"
  >
    <Field label="Talk Topic" name="talk-topic" required />
    <Field
      label="Additional Details"
      helpText="Provide anything related to the topic, e.g. related links, why you interested to hear about that, or any recommend speaker"
      name="additional-details"
      InputComponent="textarea"
    />
    <Field
      label="Your Email"
      helpText="Used to communicate with you, will be kept private."
      name="email"
      type="email"
      required
    />
    <input type="hidden" name="form-name" value="talk-topic-form" />
    <div>
      <Button
        sx={{
          fontSize: [1, 2, 2],
        }}
        as="button"
        type="submit"
      >
        Submit Topic
      </Button>
    </div>
  </form>
);
