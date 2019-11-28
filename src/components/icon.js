/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql, useStaticQuery } from 'gatsby';

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
      sx={{
        maxWidth: [50, 70],
      }}
      {...props}
      src={data.file.publicURL}
    />
  );
}
