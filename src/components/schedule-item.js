/** @jsx jsx */
import { Flex, jsx, Styled } from 'theme-ui';
import { Coffee, Radio, Home } from 'react-feather';

function ScheduleItemIcon({ type }) {
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
      <Styled.h4
        sx={{
          fontSize: 3,
        }}
      >
        {icon} {type}
      </Styled.h4>
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
        <ScheduleItemIcon type={type} />
      )}
      <div sx={{ width: '100%' }}>
        <Styled.p />
        {isTalk ? (
          talk && <Styled.p>{talk.description}</Styled.p>
        ) : (
          <Styled.p>{desc}</Styled.p>
        )}
      </div>
    </Flex>
  );
}
