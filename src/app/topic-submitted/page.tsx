import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Topic Submitted",
};

export default function TopicSubmittedPage() {
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Topic Submitted</h1>
      <p>Thank you for submitting the topic.</p>
    </Container>
  );
}
