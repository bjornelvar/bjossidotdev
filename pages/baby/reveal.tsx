import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>,
    );
  });

  return (
    <div>
      <h2>Countdown to Reveal</h2>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      <div>Reveal Date: {new Date(targetDate).toLocaleString()}</div>
    </div>
  );
};

const Reveal: React.FC = () => {
  const revealDate = '2024-12-24T04:30:00';

  return (
    <div>
      <h1>Hello, World!</h1>
      <Countdown targetDate={revealDate} />
    </div>
  );
};

export default Reveal;
