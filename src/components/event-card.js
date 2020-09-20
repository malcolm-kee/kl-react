/** @jsx jsx */
import { graphql } from 'gatsby';
import { jsx } from 'theme-ui';
import Image from 'gatsby-image';
import { titleCase } from '../lib';
import { Badge } from './badge';
import { Link } from './link';
import cx from 'classnames';

export function EventCard({
  id,
  name,
  venueName,
  status,
  link,
  dateTime,
  info,
  ...props
}) {
  const isUpcoming = status === 'upcoming';

  const allPeople = info && (info.instructor || info.speakers);

  return (
    <Link
      to={info ? `/event/${info.name}` : link}
      className="focus:shadow-outline-teal"
      {...props}
    >
      <div className="flex items-center justify-between">
        <Badge color={colorForType[info && info.type] || 'gray'}>
          {(info && titleCase(info.type)) || 'Others'}
        </Badge>
        {isUpcoming && <Badge color="primary">Upcoming</Badge>}
      </div>
      <h3 className="text-2xl font-medium">{name}</h3>
      <p>
        {dateTime} {venueName && `@${venueName}`}
      </p>
      {allPeople && allPeople.length > 0 && (
        <div className="flex">
          {allPeople
            .filter((i) => !!i.imageFile)
            .map((i, index, all) => (
              <Image
                fixed={i.imageFile.childImageSharp.fixed}
                className={cx(
                  'rounded-full shadow-solid text-white',
                  index > 0 && '-ml-2',
                  zIndex[all.length - index - 1]
                )}
                alt={i.name}
                key={index}
              />
            ))}
        </div>
      )}
    </Link>
  );
}

const zIndex = ['z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50'];

const colorForType = {
  meetup: 'pink',
  workshop: 'indigo',
  webcast: 'green',
};

export const query = graphql`
  fragment EventCard on MeetupEvent {
    id
    name
    venueName
    status
    link
    dateTime(formatString: "ddd, DD MMM YYYY h:mm A")
    info {
      id
      name
      type
      instructor {
        name
        imageFile {
          childImageSharp {
            fixed(width: 40) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
      speakers {
        name
        imageFile {
          childImageSharp {
            fixed(width: 40) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
  }
`;
