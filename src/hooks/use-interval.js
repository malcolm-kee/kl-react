import React from 'react';

export function useInterval(callback, delay) {
  const savedCallback = React.useRef();
  const [lastReset, setLastReset] = React.useState(0);

  // Remember the latest function.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, lastReset]);

  return function reset() {
    setLastReset(cur => cur + 1);
  };
}
