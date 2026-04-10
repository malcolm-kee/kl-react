import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Talk Submitted",
};

export default function TalkSubmittedPage() {
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Talk Submitted</h1>
      <p className="mb-2">Thank you for register to be a speaker.</p>
      <p>We&apos;ll be in touch with you if your talk is selected!</p>
    </Container>
  );
}
