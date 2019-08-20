/** @jsx jsx */
import { Coffee, Home, Radio } from 'react-feather';
import { Flex, jsx, Styled } from 'theme-ui';
import { DesktopOnly } from './desktop-only';

const scheduleTypeStyle = {
  fontSize: 3,
};

function ScheduleTypeDisplay({ type }) {
  const icon =
    type === 'food' ? (
      <Coffee />
    ) : type === 'announcement' ? (
      <Radio />
    ) : type === 'home' ? (
      <Home />
    ) : null;

  return (
    <div
      sx={{
        flex: 'none',
        width: ['50%', 192],
      }}
    >
      {icon ? (
        <Styled.h4 sx={scheduleTypeStyle}>
          {icon}{' '}
          <DesktopOnly>
            <span>{type}</span>
          </DesktopOnly>
        </Styled.h4>
      ) : (
        <Styled.h4 sx={scheduleTypeStyle}>{type}</Styled.h4>
      )}
    </div>
  );
}

export function ScheduleItem({ time, type, talk, desc }) {
  const isTalk = type === 'talk';

  return (
    <Flex
      sx={{
        flexWrap: ['wrap', 'nowrap'],
        alignItems: 'baseline',
      }}
    >
      <div
        sx={{
          flex: 'none',
          width: ['50%', 128],
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
        talk && (
          <div
            sx={{
              flex: 'none',
              width: ['50%', 192],
            }}
          >
            <Styled.h4
              sx={{
                fontSize: 3,
              }}
            >
              {talk.title}
            </Styled.h4>
            {talk.speaker && talk.speaker.name}
          </div>
        )
      ) : (
        <ScheduleTypeDisplay type={type} />
      )}
      <div sx={{ width: '100%' }}>
        <Styled.p />
        {isTalk ? (
          talk && (
            <Styled.p sx={{ whiteSpace: 'pre-wrap' }}>
              {talk.description}
            </Styled.p>
          )
        ) : (
          <Styled.p sx={{ whiteSpace: 'pre-wrap' }}>{desc}</Styled.p>
        )}
      </div>
    </Flex>
  );
}
