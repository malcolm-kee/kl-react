import { fireEvent, render } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../gatsby-plugin-theme-ui';
import { SubmitTalkForm } from './submit-talk-form';

describe('<SubmitTalkForm />', () => {
  test('input all required inputs', () => {
    const { inputField, submit } = setup();
    inputField('Talk Title', 'Intro to React JS');
    inputField(
      'Talk Description',
      `This is awesome talk.
    I promise.`
    );
    inputField('Talk Length', '15 mins');
    inputField('Your Name', 'Malcolm Kee');
    inputField('About You', 'React developer');
    inputField('Email', 'malcolm.keeweesiong@gmail.com');
    inputField('Would you like some helps on preparing your talk?', 'false');

    submit();
  });

  test('missing required inputs', () => {
    const { inputField, submit } = setup();
    inputField('Talk Title', 'Intro to React JS');
    inputField('Talk Length', '15 mins');

    submit();

    // can't test for exception handling because JsDOM does not implement form submit
  });
});

function setup() {
  const renderResults = render(
    <ThemeProvider value={theme}>
      <SubmitTalkForm />
    </ThemeProvider>
  );

  return {
    ...renderResults,
    inputField: (label, value) => {
      const input = renderResults.getByLabelText(label, { exact: false });

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value } });
      fireEvent.blur(input);
    },
    submit: () => userEvents.click(renderResults.getByText('Submit Talk')),
  };
}
