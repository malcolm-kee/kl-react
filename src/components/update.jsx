/** @jsx jsx */
import { graphql } from 'gatsby';
import { jsx } from 'theme-ui';
import { isFilledArray } from '../lib';
import { Link } from './link';

export const Update = ({ title, description, links }) => (
  <article className="mb-8 lg:grid lg:grid-cols-4 lg:gap-4">
    <div className="text-xl font-bold mb-2">{title}</div>
    <div className="prose lg:col-span-2">
      <p className="whitespace-pre-wrap">{description}</p>
    </div>
    <div className="prose">
      {isFilledArray(links) && (
        <ul>
          {links.map((link) => (
            <li key={link.url}>
              <Link to={link.url} isExternal>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
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
