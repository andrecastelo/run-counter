import { useEffect, useState } from 'react';
import { TimerContainer, TimerText, ButtonContainer, Button } from './styles';
import { Run } from './types';
import { formatDuration } from './formatDuration';
import { UPDATE_INTERVAL } from './constants';
import { RunStats } from './RunStats';
import { useSessions } from '../Session/useSessions';

export const Timer = () => {
  const [active, setActive] = useState(false);
  const [duration, setDuration] = useState(0);
  const { saveRun, activeSession, clearRuns } = useSessions();

  const runs = activeSession.runs;

  const nextRun = () => {
    const lastRun = runs[runs.length - 1];
    const run = { duration, index: (lastRun?.index || 0) + 1 };
    saveRun(run);
    setDuration(0);
  };

  const clear = () => {
    setActive(false);
    setDuration(0);
    clearRuns();
  };

  const stop = () => {
    nextRun();
    setActive(false);
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
      <TimerText>{activeSession.name}</TimerText>
      <TimerText>{formatDuration(duration)}</TimerText>
      <ButtonContainer>
        <Button onClick={() => setActive((x) => (x ? false : true))}>
          {active ? 'Pause' : 'Start'}
        </Button>
        <Button disabled={runs.length === 0} onClick={clear}>
          Clear
        </Button>
        <Button disabled={!active} onClick={stop}>
          Stop
        </Button>
        {active && <Button onClick={nextRun}>Next Run</Button>}
      </ButtonContainer>
      <RunStats currentDuration={duration} runs={runs} />
    </TimerContainer>
  );
};
