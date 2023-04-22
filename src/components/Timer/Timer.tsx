import { useEffect, useState } from 'react';
import { TimerContainer, TimerText, ButtonContainer, Button } from './styles';
import { Run } from './types';
import { formatDuration } from './formatDuration';
import { UPDATE_INTERVAL } from './constants';
import { RunStats } from './RunStats';

export const Timer = () => {
  const [active, setActive] = useState(false);
  const [runs, setRuns] = useState<Run[]>([]);
  const [duration, setDuration] = useState(0);

  const nextRun = () => {
    const lastRun = runs[runs.length - 1];
    setRuns([...runs, { duration, index: (lastRun?.index || 0) + 1 }]);
    setDuration(0);
  };

  const clear = () => {
    setActive(false);
    setDuration(0);
    setRuns([]);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (active) {
      interval = setInterval(() => {
        setDuration((d) => d + 1);
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
      <RunStats currentDuration={duration} runs={runs} />
    </TimerContainer>
  );
};
