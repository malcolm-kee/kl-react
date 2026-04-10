import type { Metadata } from "next";
import { Article } from "@/components/article";
import { Aside } from "@/components/aside";
import { PageTitle } from "@/components/page-title";
import { NLink } from "@/components/nav-link";
import { SubmitTalkForm } from "@/components/submit-talk-form";

export const metadata: Metadata = {
  title: "Submit A Talk",
  description: "Submit a talk to speak at next React KL meetup",
};

export default function SubmitATalkPage() {
  return (
    <Article className="bg-linear-to-b from-gray-100 to-gray-50">
      <PageTitle>Submit A Talk</PageTitle>
      <p>
        Register your interest to give a talk at React KL Meetup! If you
        doesn&apos;t want to give talk but interested to hear about a topic,{" "}
        <NLink to="/submit-topic" className="text-primary-700">
          submit a topic
        </NLink>{" "}
        instead.
      </p>
      <p>
        The topic of your talk does not necessarily be related to React itself,
        but it must be targeted at React developers. For instance, it&apos;s
        fine to give talk tools/patterns in Angular, but you should make it
        relevant, e.g. compare it with React, or how it could be applied when
        writing React code.
      </p>
      <Aside>
        <div>
          If you interested to give a talk but doesn&apos;t have a topic in
          mind, just put <em>&quot;Need suggestion&quot;</em> in the &quot;Talk
          Title&quot; and &quot;Talk Description&quot; fields. We&apos;ll contact
          you to brainstorm on the topic together.
        </div>
      </Aside>
      <div className="py-3">
        <SubmitTalkForm />
      </div>
    </Article>
  );
}
