import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import * as React from 'react';

export function Icon({ className, ...props }) {
  // use 100px * 100px image to make it not blur in retina display
  // resize manually instead of use gatsby plugin as the outcome quite blur
  const data = useStaticQuery(graphql`
    {
      file(name: { eq: "durian-react-140" }) {
        publicURL
        childImageSharp {
          fluid(maxWidth: 70) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);

  return (
    <div className={cx('w-12 h-12 sm:w-14 sm:h-14', className)}>
      <Image
        alt="React KL Icon"
        {...props}
        fluid={data.file.childImageSharp.fluid}
      />
    </div>
  );
}
