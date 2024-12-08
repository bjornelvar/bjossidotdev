import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    const timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      timeLeft.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      timeLeft.minutes = Math.floor((difference / 1000 / 60) % 60);
      timeLeft.seconds = Math.floor((difference / 1000) % 60);
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>(
    calculateTimeLeft(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const { days, hours, minutes, seconds } = timeLeft;
  const isTimeUp =
    days == null || hours == null || minutes == null || seconds == null;

  return (
    <div className='mb-8 text-center'>
      <h2 className='text-l mb-4 font-semibold'>🧒🏼 or 👧🏼</h2>
      {!isTimeUp ? (
        <div className='flex justify-center space-x-4'>
          <div className='flex flex-col items-center rounded bg-gray-100 px-4 py-2 dark:bg-gray-800'>
            <span className='text-3xl font-bold'>{days}</span>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              Days
            </span>
          </div>
          <div className='flex flex-col items-center rounded bg-gray-100 px-4 py-2 dark:bg-gray-800'>
            <span className='text-3xl font-bold'>{hours}</span>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              Hours
            </span>
          </div>
          <div className='flex flex-col items-center rounded bg-gray-100 px-4 py-2 dark:bg-gray-800'>
            <span className='text-3xl font-bold'>{minutes}</span>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              Minutes
            </span>
          </div>
          <div className='flex flex-col items-center rounded bg-gray-100 px-4 py-2 dark:bg-gray-800'>
            <span className='text-3xl font-bold'>{seconds}</span>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              Seconds
            </span>
          </div>
        </div>
      ) : (
        <span className='text-xl font-semibold'>Time's up!</span>
      )}
      <div className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
        Reveal Date: {new Date(targetDate).toLocaleString()}
      </div>
    </div>
  );
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Reveal: React.FC = () => {
  const revealDate = '2024-12-24T04:30:00';

  const images = [
    '/baby-images/IMG_5414.JPG',
    '/baby-images/IMG_9452.JPG',
    '/baby-images/IMG_9686.JPG',
  ];

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center px-4'>
      <h1 className='mb-6 text-2xl font-bold'>Hello, World!</h1>
      <Countdown targetDate={revealDate} />
      <div className='mb-8 w-full max-w-xl'>
        <Slider {...sliderSettings}>
          {images.map((src, index) => (
            <div key={index}>
              <div className='flex h-96 w-full items-center justify-center overflow-hidden'>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className='h-full w-auto object-cover object-center'
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Reveal;
