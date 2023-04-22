import { DURATION_DENOMINATOR, DECIMALS } from './constants';

export const formatDuration = (duration: number | undefined) => {
  if (!duration) {
    return '-';
  }

  const seconds = duration / DURATION_DENOMINATOR;
  const minutes = seconds > 60 ? Math.floor(seconds / 60) : 0;
  const hours = minutes > 60 ? Math.floor(minutes / 60) : 0;
  const extraSeconds = seconds % 60;

  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    extraSeconds.toFixed(DECIMALS).replace('.', ':').padStart(4, '0'),
  ].join(':');
};
