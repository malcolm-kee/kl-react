/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui';
import { graphql } from 'gatsby';

export function WorkshopSummary({ description, takeaways }) {
  return (
    <Container>
      {description && <Styled.p sx={{ fontSize: 3 }}>{description}</Styled.p>}
      {takeaways && (
        <div>
          <Styled.h2>In this workshop, you will learn</Styled.h2>
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
  fragment WorkshopSummary on EventYaml {
    description
    takeaways
  }
`;
