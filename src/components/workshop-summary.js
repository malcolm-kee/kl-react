/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui';

export function WorkshopSummary({ upcomingEvent }) {
  return (
    <Container>
      {upcomingEvent.description && (
        <Styled.p sx={{ fontSize: 3 }}>{upcomingEvent.description}</Styled.p>
      )}
      {upcomingEvent.takeaways && (
        <div>
          <Styled.h2>In this workshop, you will learn</Styled.h2>
          <div>
            <ul>
              {upcomingEvent.takeaways.map((item, index) => (
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
