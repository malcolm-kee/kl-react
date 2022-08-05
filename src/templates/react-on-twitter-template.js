import { graphql } from 'gatsby';
import * as React from 'react';
import { Layout } from '../components/layout';
import { Seo } from '../components/seo';
import { Tweets } from '../components/tweets';

function ReactOnTwitter({ data, location }) {
  const tweets = data.tweets.nodes;

  return (
    <>
      <Seo
        title="React on Twitter"
        description="Curated non-educational tweets for React developers"
        pathname={location.pathname}
      />
      <Layout>
        <Tweets tweets={tweets} />
      </Layout>
    </>
  );
}

export default ReactOnTwitter;

export const pageQuery = graphql`
  {
    tweets: allTwitterFavoritesListReacttweets(
      filter: { is_quote_status: { eq: false } }
    ) {
      nodes {
        ...Tweet
      }
    }
  }
`;
