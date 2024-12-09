import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

interface CountdownProps {
  targetDate: string;
  onReveal: () => void; // New callback prop
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, onReveal }) => {
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

  // Format date and time in Icelandic
  const date = new Intl.DateTimeFormat('is-IS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(targetDate));

  const time = new Intl.DateTimeFormat('is-IS', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(targetDate));

  return (
    <div className='mb-8 text-center'>
      <h2 className='text-l mb-4 font-semibold'>
        Er ég Björnsson eða Björnsdóttir?
      </h2>
      {/* Only show the reveal date if time isn't up */}
      {!isTimeUp && (
        <div className='mb-4 text-sm text-gray-500 dark:text-gray-400'>
          Kemur í ljós {date} kl. {time}
        </div>
      )}
      {!isTimeUp ? (
        <div className='flex justify-center space-x-4'>
          <div className='flex flex-col items-center rounded bg-gray-100 px-4 py-2 dark:bg-gray-800'>
            <span className='text-3xl font-bold'>{days}</span>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              Dagar
            </span>
          </div>
          <div className='flex flex-col items-center rounded bg-gray-100 px-4 py-2 dark:bg-gray-800'>
            <span className='text-3xl font-bold'>{hours}</span>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              Klst
            </span>
          </div>
          <div className='flex flex-col items-center rounded bg-gray-100 px-4 py-2 dark:bg-gray-800'>
            <span className='text-3xl font-bold'>{minutes}</span>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              Mín
            </span>
          </div>
          <div className='flex flex-col items-center rounded bg-gray-100 px-4 py-2 dark:bg-gray-800'>
            <span className='text-3xl font-bold'>{seconds}</span>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              Sek
            </span>
          </div>
        </div>
      ) : (
        <div>
          <span className='mb-4 block text-xl font-semibold'></span>
          <button
            onClick={onReveal}
            className='rounded bg-blue-500 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-600'
          >
            Opnaðu pakkann! 🎁
          </button>
        </div>
      )}
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
  const debugMode = false;
  const revealDate = debugMode
    ? new Date(Date.now() + 5000).toISOString() // 5 seconds from now for testing
    : '2024-12-24T04:30:00';

  const images = [
    '/baby-images/1.png',
    '/baby-images/2.png',
    '/baby-images/3.png',
    '/baby-images/4.png',
    '/baby-images/5.png',
    '/baby-images/6.png',
    '/baby-images/7.png',
    '/baby-images/8.png',
    '/baby-images/9.png',
    '/baby-images/10.png',
    '/baby-images/11.png',
    '/baby-images/12.png',
    '/baby-images/13.png',
    '/baby-images/14.png',
    '/baby-images/15.png',
    '/baby-images/16.png',
    '/baby-images/17.png',
    '/baby-images/18.png',
  ];

  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  if (revealed) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-blue-200'>
        <div className='text-center'>
          {/* whitespace-nowrap to keep everything on one line */}
          <div className='mb-4 animate-pulse whitespace-nowrap text-5xl font-bold text-blue-900'>
            🎉 Strákur! 🎉
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center px-4'>
      <h1 className='mb-6 text-2xl font-bold'>Halló heimur!</h1>
      <Countdown targetDate={revealDate} onReveal={handleReveal} />
      <div className='mb-8 w-full max-w-full'>
        <Slider {...sliderSettings}>
          {images.map((src, index) => (
            <div key={index}>
              <div
                className='flex w-full items-center justify-center overflow-hidden'
                style={{ height: '50vh' }}
              >
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className='max-h-full max-w-full object-contain object-center'
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
