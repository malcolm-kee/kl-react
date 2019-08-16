/** @jsx jsx */
import { useState } from 'react';
import { Container, jsx } from 'theme-ui';
import { useInterval } from '../hooks/use-interval';
import { Tweet } from './tweet';

export const Tweets = ({ tweets = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [delay, setDelay] = useState(3000);

  const reset = useInterval(() => {
    next();
  }, delay);

  function next() {
    setActiveIndex(cur => (tweets.length - 1 === cur ? 0 : cur + 1));
  }

  return (
    <div
      id="tweets"
      sx={{
        py: 2,
      }}
    >
      <Container sx={{ py: 0 }}>
        <div
          sx={{
            position: 'fixed',
            right: 2,
            bottom: 2,
          }}
        >
          <button
            onClick={() => {
              reset();
              setActiveIndex(i => i - 1);
            }}
          >
            Prev
          </button>
          <button onClick={() => setDelay(d => (d === null ? 3000 : null))}>
            {delay === null ? 'Play' : 'Pause'}
          </button>
          <button
            onClick={() => {
              reset();
              next();
            }}
          >
            Next
          </button>
        </div>
        <div>
          {tweets
            .filter((_, index) => index === activeIndex)
            .map(tweet => (
              <Tweet
                {...tweet}
                sx={{
                  height: `calc(100vh - 100px)`,
                }}
                key={tweet.id}
              />
            ))}
        </div>
      </Container>
    </div>
  );
};
