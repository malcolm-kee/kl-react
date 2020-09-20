import * as React from 'react';
import { NButton } from './button';
import { Container } from './container';
import { NLink } from './nav-link';

export function CTA() {
  return (
    <div id="cta" className="py-10">
      <Container>
        <NButton to="https://fb.me/klreact" size="large" as={NLink}>
          FOLLOW US
        </NButton>
      </Container>
    </div>
  );
}
