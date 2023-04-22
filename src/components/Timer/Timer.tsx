import { useEffect, useState } from 'react';
import {
  TimerContainer,
  TimerText,
  ButtonContainer,
  Button,
  InfoRow,
  RunText,
  RunList,
} from './styles';

type Run = {
  duration: number;
};

const UPDATE_INTERVAL = 100;
const DURATION_DENOMINATOR = 1000 / UPDATE_INTERVAL;
const DECIMALS = 4 - `${UPDATE_INTERVAL}`.length;

const formatDuration = (duration: number) => {
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

export const Timer = () => {
  const [active, setActive] = useState(false);
  const [runs, setRuns] = useState<Run[]>([]);
  const [totalRun, setTotalRun] = useState(0);
  const [duration, setDuration] = useState(0);

  const nextRun = () => {
    setRuns([...runs, { duration }]);
    setDuration(0);
  };

  const clear = () => {
    setActive(false);
    setDuration(0);
    setTotalRun(0);
    setRuns([]);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (active) {
      interval = setInterval(() => {
        setDuration((d) => d + 1);
        setTotalRun((d) => d + 1);
      }, UPDATE_INTERVAL);
    } else if (!active && duration !== 0 && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [active, duration]);

  return (
    <TimerContainer>
      <TimerText>{formatDuration(duration)}</TimerText>
      <ButtonContainer>
        <Button onClick={() => setActive((x) => (x ? false : true))}>
          {active ? 'Pause' : 'Start'}
        </Button>
        <Button disabled={runs.length === 0} onClick={clear}>
          Clear
        </Button>
        {active && <Button onClick={nextRun}>Next Run</Button>}
      </ButtonContainer>
      <InfoRow>
        <RunText>Total Run:</RunText>
        <RunText>{formatDuration(totalRun)}</RunText>
      </InfoRow>
      <RunList>
        {runs.map((run, index) => (
          <InfoRow key={`run__${index}`}>
            <RunText>{index + 1}</RunText>
            <RunText>{formatDuration(run.duration)}</RunText>
          </InfoRow>
        ))}
      </RunList>
    </TimerContainer>
  );
};
