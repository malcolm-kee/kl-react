import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { SubmitTalkForm } from './submit-talk-form';

describe('<SubmitTalkForm />', () => {
  test('input all required inputs', () => {
    const { inputField, submit, submitHandler } = setup();
    inputField('Talk Title', 'Intro to React JS');
    inputField('Talk Length', '15 mins');
    inputField('Your Name', 'Malcolm Kee');
    inputField('About You', 'React developer');
    inputField('Email', 'malcolm.keeweesiong@gmail.com');
    inputField('Would you like some helps on preparing your talk?', 'false');

    submit();

    expect(submitHandler).toHaveBeenCalledTimes(1);
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
  const renderResults = render(<SubmitTalkForm />);
  const form = renderResults.container.querySelector('form');
  const submitHandler = jest.fn(ev => {
    ev.preventDefault();
  });

  form.addEventListener('submit', submitHandler);

  return {
    ...renderResults,
    inputField: (label, value) => {
      const input = renderResults.getByLabelText(label, { exact: false });

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value } });
      fireEvent.blur(input);
    },
    submit: () => fireEvent.click(renderResults.getByText('Submit Talk')),
    submitHandler,
  };
}
