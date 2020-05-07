import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

export const Seo = ({
  title,
  description,
  pathname,
  image,
  largeImage,
  keywords,
}) => {
  const {
    site: {
      siteMetadata: {
        defaultTitle,
        defaultDescription,
        defaultKeywords,
        siteUrl,
        twitter,
      },
    },
    siteImage: { publicURL },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          defaultKeywords: keywords
          siteUrl: url
          twitter
        }
      }
      siteImage: file(name: { eq: "durian-react-social" }) {
        publicURL
      }
    }
  `);

  const imagePath = largeImage || image || publicURL;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || '/'}`,
    image: imagePath[0] === '/' ? `${siteUrl}${imagePath}` : imagePath,
    keywords: keywords
      ? Array.isArray(keywords)
        ? keywords.join(',')
        : keywords
      : defaultKeywords.join(','),
  };

  return (
    <Helmet title={seo.title}>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta
        name="twitter:card"
        content={largeImage ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
};
