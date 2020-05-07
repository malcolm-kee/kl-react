/** @jsx jsx */
import { graphql } from 'gatsby';
import { jsx, Styled } from 'theme-ui';
import { Container } from './container';

export function WebcastSummary({ description, takeaways }) {
  return (
    <Container
      sx={{
        mb: [4, 4, 6],
      }}
    >
      {description && <Styled.p sx={{ fontSize: 3 }}>{description}</Styled.p>}
      {takeaways && (
        <div>
          <Styled.h2>In this webcast, you will learn</Styled.h2>
          <div>
            <ul>
              {takeaways.map((item, index) => (
                <li key={index}>
                  <Styled.p sx={{ fontSize: 3 }}>{item}</Styled.p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Container>
  );
}

export const query = graphql`
  fragment WebcastSummary on EventYaml {
    description
    takeaways
  }
`;
