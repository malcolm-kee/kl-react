import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

export function Icon(props) {
  const data = useStaticQuery(graphql`
    {
      file(name: { eq: "reactkl-logo-transparent" }) {
        childImageSharp {
          resize(width: 50) {
            src
          }
        }
      }
    }
  `);

  return (
    <img
      alt="React KL Icon"
      {...props}
      src={data.file.childImageSharp.resize.src}
    />
  );
}
