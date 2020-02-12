/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { graphql } from 'gatsby';
import { isFilledArray } from '../lib';
import { Link } from './link';

export const Update = ({ title, description, links }) => (
  <article
    sx={{
      mb: 4,
    }}
  >
    <strong
      sx={{
        fontSize: 3,
      }}
    >
      {title}
    </strong>
    <p
      sx={{
        textAlign: 'justify',
        whiteSpace: 'pre-wrap',
      }}
    >
      {description}
    </p>
    {isFilledArray(links) && (
      <Styled.ul>
        {links.map(link => (
          <li key={link.url}>
            <Link to={link.url} isExternal>
              {link.label}
            </Link>
          </li>
        ))}
      </Styled.ul>
    )}
  </article>
);

export const query = graphql`
  fragment Update on UpdateYaml {
    title
    description
    links {
      label
      url
    }
  }
`;
