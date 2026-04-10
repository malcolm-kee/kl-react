import type { Metadata } from "next";
import { Article } from "@/components/article";
import { PageTitle } from "@/components/page-title";
import { NLink } from "@/components/nav-link";
import { TalkTopicForm } from "@/components/talk-topic-form";

export const metadata: Metadata = {
  title: "Submit A Talk Topic",
  description: "Submit a talk topic that you interested",
};

export default function SubmitTopicPage() {
  return (
    <Article>
      <PageTitle>Submit A Topic</PageTitle>
      <p>
        Let us know what you like to hear about in next meetup! We&apos;ll share
        this with anyone that interested to give a talk but doesn&apos;t have
        topic.
      </p>
      <p>
        If you would like to give the talk yourself,{" "}
        <NLink to="/submit-a-talk" className="text-primary-500">
          submit a talk
        </NLink>{" "}
        instead.
      </p>
      <TalkTopicForm />
    </Article>
  );
}
