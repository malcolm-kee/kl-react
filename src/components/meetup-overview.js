import { graphql } from 'gatsby';
import * as React from 'react';
import { FaMeetup as Meetup } from 'react-icons/fa';
import { FiBook as Book } from 'react-icons/fi';
import { Container } from './container';
import { Link } from './link';

export const MeetupOverview = ({ name, dateTime, venueName, link, info }) => (
  <div id="meetup-overview">
    <Container className="py-12">
      <h1 className="text-4xl md:text-6xl font-medium text-primary-600">
        {name}
      </h1>
      <div className="mb-3 md:mb-6 space-y-3">
        <p className="text-lg md:text-2xl xl:text-3xl">{dateTime}</p>
        <p className="text-lg md:text-2xl xl:text-3xl">@{venueName} </p>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to={link}
          className="inline-flex items-center text-lg text-pink-600 hover:text-pink-700"
        >
          <Meetup className="h-8 w-8 mr-1" aria-hidden />
          Meetup
        </Link>
        {info && info.site && (
          <Link
            to={info.site}
            className="inline-flex items-center text-lg text-gray-500 hover:text-gray-600"
          >
            <Book className="h-8 w-8 mr-1" aria-hidden />
            Material
          </Link>
        )}
      </div>
    </Container>
  </div>
);

export const query = graphql`
  fragment MeetupOverview on MeetupEvent {
    name
    link
    status
    isFull
    dateTime(formatString: "ddd, DD MMM YYYY h:mm A")
    mapURL
    venueName
    info {
      site
    }
  }
`;
