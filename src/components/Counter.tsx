import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [counts, setCounts] = useState(0);

  const countUp = () => {
    setCount((prevState) => prevState + 1);
  };

  const countDown = () => {
    setCount((prevState) => prevState - 1);
  };

  const countsUp = () => {
    setCounts((prevState) => prevState + 1);
  };

  const countsDown = () => {
    setCounts((prevState) => prevState - 1);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Current count is...', count);
  }, [count]);

  return (
    <div>
      <p>
        カウンター
        <br />
        カウント1: {count}
      </p>
      <button onClick={countUp} type="button">
        up
      </button>
      <button onClick={countDown} type="button">
        down
      </button>
      <p>カウント2: {counts}</p>
      <button onClick={countsUp} type="button">
        up
      </button>
      <button onClick={countsDown} type="button">
        down
      </button>
    </div>
  );
};

export default Counter;
