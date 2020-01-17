/** @jsx jsx */
import { graphql } from 'gatsby';
// eslint-disable-next-line
import React from 'react';
import { Coffee, Home, PlusSquare, Radio, Info } from 'react-feather';
import { Flex, jsx, Styled } from 'theme-ui';
import { DesktopOnly } from './desktop-only';
import { TalkMaterialIcons } from './talk-material-icons';
import { Link } from './link';
import { List } from './list';

const scheduleTypeStyle = {
  fontSize: 3,
  display: 'inline-flex',
  alignItems: 'center',
};

const iconStyle = {
  mr: 1,
  color: 'textLight',
};

const titleStyle = {
  flex: 'none',
  width: ['60%', 192],
  py: 2,
  pr: [0, 2],
  textAlign: ['right', 'left'],
};

const descStyle = {
  whiteSpace: 'pre-wrap',
  my: 0,
  textAlign: ['justify', 'left'],
};

const IconMap = {
  food: { Component: Coffee, label: 'Food' },
  announcement: { Component: Info, label: 'Shout out' },
  home: { Component: Home, label: 'End' },
  clinic: { Component: PlusSquare, label: 'React Clinic' },
  news: { Component: Radio, label: 'This Month on React' },
};

function ScheduleTypeDisplay({ type }) {
  const Icon = IconMap[type];

  return (
    <div sx={titleStyle}>
      {Icon ? (
        <Styled.h4 sx={scheduleTypeStyle}>
          <Icon.Component sx={iconStyle} />{' '}
          <DesktopOnly>
            <span>{Icon.label}</span>
          </DesktopOnly>
        </Styled.h4>
      ) : (
        <Styled.h4 sx={scheduleTypeStyle}>{type}</Styled.h4>
      )}
    </div>
  );
}

export function ScheduleItem({ time, type, talk, desc, speakersOnSamePage }) {
  const isTalk = type === 'talk';

  return (
    <Flex
      sx={{
        flexWrap: ['wrap', 'nowrap'],
        alignItems: 'baseline',
        py: [2, 3],
      }}
    >
      <div
        sx={{
          flex: 'none',
          width: ['40%', 128],
        }}
      >
        <Styled.h3
          sx={{
            fontSize: 3,
          }}
        >
          {time}
        </Styled.h3>
      </div>
      {isTalk ? (
        talk ? (
          <div sx={titleStyle}>
            <Styled.h4
              sx={{
                fontSize: 3,
              }}
            >
              {talk.title}
            </Styled.h4>
            {talk.speaker &&
              (speakersOnSamePage ? (
                <Styled.a href={`#${talk.speaker.id}`}>
                  {talk.speaker.name}
                </Styled.a>
              ) : (
                <Link to={`/speakers/#${talk.speaker.id}`}>
                  {talk.speaker.name}
                </Link>
              ))}
          </div>
        ) : (
          <div sx={titleStyle}>
            <Styled.h4
              sx={{
                fontSize: 3,
              }}
            >
              TBD
            </Styled.h4>
          </div>
        )
      ) : (
        <ScheduleTypeDisplay type={type} />
      )}
      <div sx={{ width: '100%' }}>
        {isTalk ? (
          talk ? (
            <>
              <Styled.p sx={descStyle}>{talk.description}</Styled.p>
              {talk && talk.materials && (
                <List
                  sx={{
                    my: 1,
                  }}
                >
                  {talk.materials.map((material, i) => (
                    <li
                      key={i}
                      sx={{
                        display: 'inline-block',
                        mr: 1,
                      }}
                    >
                      <TalkMaterialIcons
                        type={material.type}
                        url={material.url}
                      />
                    </li>
                  ))}
                </List>
              )}
            </>
          ) : (
            <Styled.p sx={descStyle}>
              TBD is the shorthand for To Be Determined, in case you don't know.
            </Styled.p>
          )
        ) : type === 'clinic' ? (
          <Styled.p sx={descStyle}>
            Get/give diagnosis of your code that is causing you headache.{' '}
            <Link to="/react-clinic">More details.</Link>
          </Styled.p>
        ) : (
          <Styled.p sx={descStyle}>{desc}</Styled.p>
        )}
      </div>
    </Flex>
  );
}

export const query = graphql`
  fragment ScheduleItem on EventYamlSchedule {
    time
    type
    desc
    talk {
      title
      description
      speaker {
        id
        name
      }
      materials {
        type
        url
      }
    }
  }
`;
