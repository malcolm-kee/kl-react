/** @jsx jsx */
import { useEffect, useMemo, useReducer } from 'react';
import { Container, jsx } from 'theme-ui';
import { useInterval } from '../hooks/use-interval';
import { ProgressBar } from './progress-bar';
import { Tweet } from './tweet';

const DEFAULT_INTERVAL = 4500;

export const Tweets = ({ tweets = [] }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'next':
          return {
            ...state,
            index: tweets.length - 1 === state.index ? 0 : state.index + 1,
            interval: state.interval === null ? null : DEFAULT_INTERVAL,
          };

        case 'prev':
          return {
            ...state,
            index: state.index === 0 ? tweets.length - 1 : state.index - 1,
            interval: state.interval === null ? null : DEFAULT_INTERVAL,
          };

        case 'setInterval':
          return {
            ...state,
            interval: state.interval === null ? null : action.payload,
          };

        case 'toggle':
          return {
            ...state,
            interval: state.interval === null ? DEFAULT_INTERVAL : null,
          };

        default:
          throw new Error(`Action not defined: ${action.type}`);
      }
    },
    {
      index: 0,
      interval: DEFAULT_INTERVAL,
    }
  );

  const reset = useInterval(() => {
    dispatch({ type: 'next' });
  }, state.interval);

  const controls =
    process.env.NODE_ENV === 'development' ? (
      <div
        sx={{
          position: 'fixed',
          right: 2,
          bottom: 2,
          zIndex: 1,
        }}
      >
        <button
          onClick={() => {
            reset();
            dispatch({ type: 'prev' });
          }}
        >
          {'<'}
        </button>
        <button onClick={() => dispatch({ type: 'toggle' })}>
          {state.interval === null ? 'Play' : 'Pause'} timeout: {state.interval}
        </button>
        <button
          onClick={() => {
            reset();
            dispatch({ type: 'next' });
          }}
        >
          {'>'}
        </button>
      </div>
    ) : null;

  return (
    <div
      id="tweets"
      sx={{
        py: 2,
      }}
    >
      <Container sx={{ py: 0 }}>
        {controls}
        <div>
          {tweets
            .filter((_, index) => index === state.index)
            .map(tweet => (
              <TweetItem
                setDelay={int =>
                  dispatch({ type: 'setInterval', payload: int })
                }
                {...tweet}
                key={tweet.id}
              />
            ))}
        </div>
      </Container>
      <ProgressBar
        sx={{
          position: 'fixed',
          bottom: 0,
        }}
        duration={state.interval}
        key={state.index}
      />
    </div>
  );
};

/**
 *
 * @param {string} displayedText
 * @param {*} entities
 * @returns {number}
 */
function calculateReadtime(displayedText, entities) {
  const textReadtime =
    displayedText && displayedText.length > 80
      ? (displayedText.length / 80) * DEFAULT_INTERVAL
      : DEFAULT_INTERVAL;
  const imageReadtime = entities
    ? entities.media.reduce(
        (total, medium) =>
          medium.alt
            ? total + (medium.alt.length / 80) * DEFAULT_INTERVAL
            : total + 1000,
        0
      )
    : 0;

  return textReadtime + imageReadtime;
}

function TweetItem({ setDelay, displayedText, entities, ...props }) {
  const readTime = useMemo(() => calculateReadtime(displayedText, entities), [
    displayedText,
    entities,
  ]);

  useEffect(() => {
    if (readTime !== DEFAULT_INTERVAL) {
      setDelay(readTime);
    }
  }, [readTime]);

  return (
    <Tweet
      {...props}
      entities={entities}
      displayedText={displayedText}
      onVideoPlay={vidDuration => setDelay(vidDuration + 1000)}
      sx={{
        height: `calc(100vh - 220px)`,
      }}
    />
  );
}
