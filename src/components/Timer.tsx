import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Button = styled.button`
  padding: 8px;
  font-size: 20px;
`;

const TimerText = styled.div`
  font-size: 24px;
  font-weight: bold;
  font-family: sans-serif;
`;

const RunText = styled.p`
  font-family: sans-serif;
`;

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
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 24px;
        gap: 16px;
      `}
    >
      <TimerText>{formatDuration(duration)}</TimerText>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 16px;
          align-items: center;
        `}
      >
        <Button onClick={() => setActive((x) => (x ? false : true))}>
          {active ? 'Pause' : 'Start'}
        </Button>
        <Button disabled={runs.length === 0} onClick={clear}>
          Clear
        </Button>
        {active && <Button onClick={nextRun}>Next Run</Button>}
      </div>
      <div
        css={css`
          display: flex;
          gap: 16px;
        `}
      >
        <RunText>Total Run:</RunText>
        <RunText>{formatDuration(totalRun)}</RunText>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column-reverse;
          justify-content: flex-start;
          gap: 16px;
        `}
      >
        {runs.map((run, index) => (
          <div
            key={`run__${index}`}
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 16px;
            `}
          >
            <RunText>{index + 1}</RunText>
            <RunText>{formatDuration(run.duration)}</RunText>
          </div>
        ))}
      </div>
    </div>
  );
};
