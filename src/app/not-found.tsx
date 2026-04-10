import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      <p className="mb-2">A 404, if you speak Http.</p>
      <p>This is probably our fault, we&apos;re sorry.</p>
    </Container>
  );
}
