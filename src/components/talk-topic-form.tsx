"use client";

import { NButton } from "./button";
import { Field } from "./form/field";
import { TextInput } from "./form/text-input";
import { Textarea } from "./form/textarea";

export function TalkTopicForm() {
  return (
    <form
      name="talk-topic-form"
      method="POST"
      action="/topic-submitted"
      data-netlify="true"
      data-netlify-honeypot="trap"
    >
      <div className="space-y-6">
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
          id="email"
          required
        >
          <TextInput name="email" type="email" />
        </Field>
      </div>
      <input type="hidden" name="form-name" value="talk-topic-form" />
      <div className="py-5">
        <NButton type="submit">Submit Topic</NButton>
      </div>
    </form>
  );
}
