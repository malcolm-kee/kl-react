/// <reference types="@testing-library/jest-dom/vitest" />
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test } from "vitest";
import { SubmitTalkForm } from "./submit-talk-form";

afterEach(cleanup);

describe("<SubmitTalkForm />", () => {
  test("input all required inputs", async () => {
    const user = userEvent.setup();
    render(<SubmitTalkForm />);

    await fillField(user, "Talk Title", "Intro to React JS");
    await fillField(
      user,
      "Talk Description",
      "This is awesome talk.\n    I promise."
    );
    await selectOption(user, "Talk Length", "15 mins");
    await fillField(user, "Your Name", "Malcolm Kee");
    await fillField(user, "About You", "React developer");
    await fillField(user, "Email", "malcolm.keeweesiong@gmail.com");
    await selectOption(
      user,
      "Would you like some helps on preparing your talk?",
      "false"
    );

    expect(screen.getByText("Submit Talk")).toBeInTheDocument();
  });

  test("missing required inputs", async () => {
    const user = userEvent.setup();
    render(<SubmitTalkForm />);

    await fillField(user, "Talk Title", "Intro to React JS");
    await selectOption(user, "Talk Length", "15 mins");

    expect(screen.getByText("Submit Talk")).toBeInTheDocument();
  });
});

async function fillField(
  user: ReturnType<typeof userEvent.setup>,
  label: string,
  value: string
) {
  const input = screen.getByLabelText(label, { exact: false });
  await user.clear(input);
  await user.type(input, value);
}

async function selectOption(
  user: ReturnType<typeof userEvent.setup>,
  label: string,
  value: string
) {
  const select = screen.getByLabelText(label, { exact: false });
  await user.selectOptions(select, value);
}
