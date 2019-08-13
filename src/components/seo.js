import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Seo = ({ title, description, pathname }) => {
  const {
    site: {
      siteMetadata: { defaultTitle, defaultDescription, siteUrl }
    }
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          siteUrl: url
        }
      }
    }
  `);

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || '/'}`
  };

  return (
    <Helmet title={seo.title}>
      <meta name="description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
    </Helmet>
  );
};

export default Seo;
