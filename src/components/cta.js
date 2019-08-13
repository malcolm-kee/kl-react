/** @jsx jsx */
import { jsx, Container } from 'theme-ui';
import Button from 'gatsby-theme-conference/src/components/button';

export default function CTA() {
  return (
    <div
      id="cta"
      sx={{
        py: [5, 6]
      }}
    >
      <Container>
        <Button href="https://www.meetup.com/kl-react/?action=join">Join Meetup</Button>
      </Container>
    </div>
  );
}
