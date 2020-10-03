import cx from 'classnames';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import * as React from 'react';
import {
  FiGithub as GitHub,
  FiGlobe as Globe,
  FiMic as Mic,
  FiTwitter as Twitter,
} from 'react-icons/fi';
import { isFilledArray, pluralize } from '../lib';
import { BackgroundImage } from './background-image';
import { BulletedList } from './bulleted-list';
import { IconLink } from './icon-link';
import { NLink } from './nav-link';

export function SpeakerCard({
  id,
  name,
  image,
  imageFile,
  bio,
  company,
  twitter,
  github,
  website,
  talk,
  workshop,
  webcast,
  showPastEvents,
  className,
  ...props
}) {
  return (
    <div
      id={id}
      className={cx(
        'space-y-4 sm:grid sm:gap-6 sm:space-y-0',
        showPastEvents ? 'sm:grid-cols-3' : 'sm:grid-cols-2',
        className
      )}
      {...props}
    >
      <div>
        {imageFile ? (
          <Image
            fluid={imageFile.childImageSharp.fluid}
            className="w-full h-full max-h-96 object-cover object-center rounded-lg shadow-lg"
          />
        ) : image ? (
          <BackgroundImage
            src={image}
            className="w-full h-full object-cover object-center rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <Mic className="w-20 h-20" />
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-medium">{name}</h3>
        <div className="text-xl">{company}</div>
        <p className="whitespace-pre-wrap my-2 text-gray-600">{bio}</p>
        <div className="-mx-2">
          {twitter && (
            <IconLink href={`https://twitter.com/${twitter}`}>
              <Twitter className="w-5 h-5" aria-hidden />
              <span className="sr-only">Twitter</span>
            </IconLink>
          )}
          {github && (
            <IconLink href={`https://github.com/${github}`}>
              <GitHub className="w-5 h-5" aria-hidden />
              <span className="sr-only">GitHub</span>
            </IconLink>
          )}
          {website && (
            <IconLink href={website}>
              <Globe className="w-5 h-5" aria-hidden />
              <span className="sr-only">Website</span>
            </IconLink>
          )}
        </div>
      </div>
      {showPastEvents && (
        <div>
          {isFilledArray(talk) && (
            <div>
              <h4 className="pt-1 pb-0.5 font-bold">
                {pluralize('Talk', talk.length)} in React KL
              </h4>
              <BulletedList>
                {/* we only shows 3 talks, remaining just a count */}
                {talk.map((t, index) =>
                  index <= 2 ? (
                    <li key={t.id}>
                      <NLink to={`/talks#${t.id}`} primary>
                        {t.title}
                      </NLink>
                    </li>
                  ) : index === 3 ? (
                    <li key={t.id}>
                      And {talk.length - 3} other{' '}
                      {pluralize('talk', talk.length - 3)}
                    </li>
                  ) : null
                )}
              </BulletedList>
            </div>
          )}
          {isFilledArray(webcast) && (
            <div>
              <h4 className="pt-1 pb-0.5 font-bold">
                {pluralize('Webcast', webcast.length)} in React KL
              </h4>
              <BulletedList>
                {/* we only shows 3 webcasts, remaining just a count */}
                {webcast.map((wcast, index) =>
                  index <= 2 ? (
                    <li key={wcast.name}>
                      <NLink to={`/event/${wcast.name}`} primary>
                        {wcast.meetup.name}
                      </NLink>
                    </li>
                  ) : index === 3 ? (
                    <li key={wcast.name}>
                      And {webcast.length - 3} other{' '}
                      {pluralize('webcast', webcast.length - 3)}
                    </li>
                  ) : null
                )}
              </BulletedList>
            </div>
          )}
          {isFilledArray(workshop) && (
            <div>
              <h4 className="pt-1 pb-0.5 font-bold">
                {pluralize('Workshop', workshop.length)} in React KL
              </h4>
              <BulletedList>
                {/* we only shows 3 workshops, remaining just a count */}
                {workshop.map((wshop, index) =>
                  index <= 2 ? (
                    <li key={wshop.name}>
                      <NLink to={`/event/${wshop.name}`} primary>
                        {wshop.meetup.name}
                      </NLink>
                    </li>
                  ) : index === 3 ? (
                    <li key={wshop.name}>
                      And {workshop.length - 3} other{' '}
                      {pluralize('workshop', workshop.length - 3)}
                    </li>
                  ) : null
                )}
              </BulletedList>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const query = graphql`
  fragment SpeakerCard on SpeakerYaml {
    id
    name
    bio
    image
    imageFile {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    company
    twitter
    github
    website
    talk {
      id
      title
    }
    workshop {
      name
      meetup {
        name
      }
    }
    webcast {
      name
      meetup {
        name
      }
    }
  }
`;
