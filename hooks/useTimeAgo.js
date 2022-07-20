import { useEffect, useState } from 'react';

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3060],
  ['minute', 60],
  ['second', 1],
];

const getDateDiffs = (timestamp) => {
  const now = Date.now();
  const elapsed = (timestamp - now) / 1000;

  for (const [unit, secondsUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsUnit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp));
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp);
      setTimeAgo(newTimeAgo);
    }, 5000);
    return () => clearInterval(interval);
  }, [timestamp]);

  const rtf = new Intl.RelativeTimeFormat(navigator.language, {
    style: 'long',
  });

  const { value, unit } = timeAgo;

  return rtf.format(value, unit);
}
