import { Container } from "./container";

interface CodelabSummaryProps {
  description?: string;
}

export function CodelabSummary({ description }: CodelabSummaryProps) {
  return (
    <Container className="prose-lg pb-10">
      {description && (
        <p className="text-2xl whitespace-pre-wrap">{description}</p>
      )}
    </Container>
  );
}
