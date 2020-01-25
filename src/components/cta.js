/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Button } from './button';
import { Container } from './container';

export function CTA() {
  return (
    <div
      id="cta"
      sx={{
        py: [5, 6],
      }}
    >
      <Container>
        <Button href="https://fb.me/klreact">Follow Us</Button>
      </Container>
    </div>
  );
}
