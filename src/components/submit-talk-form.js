/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Button } from './button';
import { Field } from './field';

export const SubmitTalkForm = () => (
  <form
    name="talk-form"
    method="POST"
    action="/talk-submitted"
    netlify-honeypot="trap"
    data-netlify="true"
  >
    <Field label="Talk Title" name="talk-title" required />
    <Field
      label="Talk Description"
      name="talk-desc"
      InputComponent="textarea"
      required
    />
    <Field
      label="Talk Length"
      name="talk-length"
      InputComponent="select"
      required
    >
      <option value="" />
      <option value="15 mins">15 mins</option>
      <option value="30 mins">30 mins</option>
      <option value="40 mins">40 mins</option>
    </Field>
    <Field label="Your Name" name="speaker-name" required />
    <Field
      label="About You"
      helpText="A brief introduction of yourself."
      name="speaker-desc"
      InputComponent="textarea"
      required
    />
    <Field
      label="Contact Details"
      helpText="Contact details for others to contact you. Can be github account, Twitter handle, personal website etc."
      placeholder={`e.g.
github: malcolm-kee
twitter: Malcolm_Kee`}
      name="speaker-contacts"
      InputComponent="textarea"
      rows={3}
    />
    <Field
      label="Email"
      helpText="Used to communicate with you, will be kept private."
      name="email"
      type="email"
      required
    />
    <Field
      label="Constraint"
      helpText="e.g. date constraint (not in June), time constraint (after 8pm), or anything you like us to know in advance."
      name="constraint"
      InputComponent="textarea"
    />
    <Field
      label="Would you like some helps on preparing your talk?"
      helpText="We can help to review your deck or rehearse with you."
      name="help-needed"
      InputComponent="select"
      required
    >
      <option value="" />
      <option value="true">Yes</option>
      <option value="false">No thanks</option>
    </Field>
    <input type="hidden" name="form-name" value="talk-form" />
    <div>
      <Button
        sx={{
          fontSize: [1, 2, 2],
        }}
        as="button"
        type="submit"
      >
        Submit Talk
      </Button>
    </div>
  </form>
);
