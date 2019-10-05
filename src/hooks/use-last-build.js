import { graphql, useStaticQuery } from 'gatsby';

/**
 * get last build time in format of DD MMM YYYY
 *
 * @returns {string}
 */
export const useLastBuild = () => {
  const {
    site: { buildTime },
  } = useStaticQuery(graphql`
    {
      site {
        buildTime(formatString: "DD MMM YYYY")
      }
    }
  `);

  return buildTime;
};
