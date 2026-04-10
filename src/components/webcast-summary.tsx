import { Container } from "./container";

interface WebcastSummaryProps {
  description?: string;
  takeaways?: string[];
}

export function WebcastSummary({ description, takeaways }: WebcastSummaryProps) {
  return (
    <Container className="prose-lg pb-10">
      {description && <p className="text-2xl">{description}</p>}
      {takeaways && (
        <div>
          <h2>In this webcast, you will learn</h2>
          <ul>
            {takeaways.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}
