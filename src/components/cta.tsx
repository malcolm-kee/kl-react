import { NButtonLink } from "./button";
import { Container } from "./container";

export function CTA() {
  return (
    <div id="cta" className="py-10">
      <Container>
        <NButtonLink href="https://fb.me/klreact" size="large">
          FOLLOW US
        </NButtonLink>
      </Container>
    </div>
  );
}
