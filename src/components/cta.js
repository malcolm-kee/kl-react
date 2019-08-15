/** @jsx jsx */
import { Container, jsx } from 'theme-ui';
import { Button } from './button';

export function CTA() {
  return (
    <div
      id="cta"
      sx={{
        py: [5, 6],
      }}
    >
      <Container>
        <Button href="https://www.meetup.com/kl-react/?action=join">
          Join Meetup
        </Button>
      </Container>
    </div>
  );
}

export default CTA;
