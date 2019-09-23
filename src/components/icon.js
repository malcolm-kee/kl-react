import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

export function Icon(props) {
  // use 100px * 100px image to make it not blur in retina display
  // resize manually instead of use gatsby plugin as the outcome quite blur
  const data = useStaticQuery(graphql`
    {
      file(name: { eq: "durian-react-140" }) {
        publicURL
      }
    }
  `);

  return (
    <img
      alt="React KL Icon"
      width={70}
      height={70}
      {...props}
      src={data.file.publicURL}
    />
  );
}
