import { Container } from "./container";

interface WorkshopSummaryProps {
  description?: string;
  takeaways?: string[];
}

export function WorkshopSummary({
  description,
  takeaways,
}: WorkshopSummaryProps) {
  return (
    <Container className="prose-lg pb-10">
      {description && <p className="text-2xl">{description}</p>}
      {takeaways && (
        <div>
          <h2>In this workshop, you will learn</h2>
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
