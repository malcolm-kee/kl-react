/** @jsx jsx */
import { jsx } from 'theme-ui';
import { NButton } from './button';
import { Field } from './form/field';
import { TextInput } from './form/text-input';
import { Textarea } from './form/textarea';

export const TalkTopicForm = () => (
  <form
    name="talk-topic-form"
    method="POST"
    action="/topic-submitted"
    netlify-honeypot="trap"
    data-netlify="true"
  >
    <Field label="Talk Topic" id="talkTopic" required>
      <TextInput name="talk-topic" />
    </Field>
    <Field
      label="Additional Details"
      helpText="Provide anything related to the topic, e.g. related links, why you interested to hear about that, or any recommend speaker"
      id="additionalDetails"
    >
      <Textarea name="additional-details" />
    </Field>
    <Field
      label="Your Email"
      helpText="Used to communicate with you, will be kept private."
      type="email"
      id="email"
      required
    >
      <TextInput name="email" type="email" />
    </Field>
    <input type="hidden" name="form-name" value="talk-topic-form" />
    <div>
      <NButton type="submit">Submit Topic</NButton>
    </div>
  </form>
);
