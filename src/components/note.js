/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { Article } from './article';
import { Layout } from './layout';

export const Note = ({ title, children }) => {
  return (
    <Layout>
      <Article>
        <Styled.h1
          sx={{
            my: [3, 4],
          }}
        >
          {title}
        </Styled.h1>
        {children}
      </Article>
    </Layout>
  );
};
