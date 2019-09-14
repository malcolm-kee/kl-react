/** @jsx jsx */
import { Container, jsx, Styled } from 'theme-ui';
import { Layout } from './layout';

export const Note = ({ title, children }) => {
  return (
    <Layout>
      <Container>
        <Styled.h1
          sx={{
            mb: [2, 3, 4],
          }}
        >
          {title}
        </Styled.h1>
        {children}
      </Container>
    </Layout>
  );
};
