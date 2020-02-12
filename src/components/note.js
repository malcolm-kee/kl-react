/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Article } from './article';
import { Layout } from './layout';
import { PageTitle } from './page-title';

export const Note = ({ title, children }) => {
  return (
    <Layout>
      <Article>
        <PageTitle>{title}</PageTitle>
        {children}
      </Article>
    </Layout>
  );
};
