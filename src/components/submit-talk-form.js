/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { NButton } from './button';
import { Field } from './form/field';
import { Select } from './form/select';
import { TextInput } from './form/text-input';
import { Textarea } from './form/textarea';

export const SubmitTalkForm = React.forwardRef(function SubmitTalkForm(
  props,
  ref
) {
  return (
    <form
      name="talk-form"
      method="POST"
      action="/talk-submitted"
      netlify-honeypot="trap"
      data-netlify="true"
      {...props}
      ref={ref}
    >
      <Field label="Talk Title" id="talk-title" required>
        <TextInput name="talk-title" />
      </Field>
      <Field
        label="Talk Description"
        id="talk-desc"
        InputComponent="textarea"
        required
      >
        <Textarea name="talk-desc" />
      </Field>
      <Field label="Talk Length" id="talk-length" required>
        <Select name="talk-length">
          <option value="" />
          <option value="15 mins">15 mins</option>
          <option value="30 mins">30 mins</option>
          <option value="40 mins">40 mins</option>
        </Select>
      </Field>
      <Field label="Your Name" id="speaker-name" required>
        <TextInput name="speaker-name" />
      </Field>
      <Field
        label="About You"
        helpText="A brief introduction of yourself."
        id="speaker-desc"
        required
      >
        <Textarea name="speaker-desc" />
      </Field>
      <Field
        label="Contact Details"
        helpText="Contact details for others to contact you. Can be github account, Twitter handle, personal website etc."
        id="contacts"
      >
        <Textarea
          placeholder={`e.g.
github: malcolm-kee
twitter: Malcolm_Kee`}
          name="speaker-contacts"
          rows={3}
        />
      </Field>
      <Field
        label="Email"
        helpText="Used to communicate with you, will be kept private."
        id="email"
        required
      >
        <TextInput name="email" type="email" />
      </Field>
      <Field
        label="Constraint"
        helpText="e.g. date constraint (not in June), time constraint (after 8pm), or anything you like us to know in advance."
        id="constraint"
      >
        <Textarea name="constraint" />
      </Field>
      <Field
        label="Would you like some helps on preparing your talk?"
        helpText="We can help to review your deck or rehearse with you."
        id="help-needed"
        required
      >
        <Select name="help-needed">
          <option value="" />
          <option value="true">Yes</option>
          <option value="false">No thanks</option>
        </Select>
      </Field>
      <input type="hidden" name="form-name" value="talk-form" />
      <div>
        <NButton type="submit">Submit Talk</NButton>
      </div>
    </form>
  );
});
