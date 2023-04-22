import { useEffect, useMemo, useState } from 'react';
import { Run } from './types';
import { formatDuration } from './formatDuration';
import { InfoRow, RunList, RunText } from './styles';

const getStats = (runs: Run[]) =>
  runs.reduce(
    (acc, run) => {
      if (!acc.best || acc.best.duration > run.duration) {
        acc = { ...acc, best: run };
      }

      if (!acc.worst || acc.worst.duration < run.duration) {
        acc = { ...acc, worst: run };
      }

      acc = { ...acc, total: acc.total + run.duration };

      return acc;
    },
    {
      total: 0,
      best: null as Run | null,
      worst: null as Run | null,
    }
  );

type RunStatsProps = {
  runs: Run[];
  currentDuration: number;
};

export const RunStats = ({ runs, currentDuration }: RunStatsProps) => {
  const { best, worst, total } = useMemo(() => getStats(runs), [runs]);

  const average = runs.length > 0 ? total / runs.length : 0;
  const totalWithCurrent = total + currentDuration;

  return (
    <>
      <InfoRow>
        <RunText>Best Run:</RunText>
        <RunText>{formatDuration(best?.duration)}</RunText>
      </InfoRow>
      <InfoRow>
        <RunText>Average:</RunText>
        <RunText>{formatDuration(average)}</RunText>
      </InfoRow>
      <InfoRow>
        <RunText>Total Run:</RunText>
        <RunText>{formatDuration(totalWithCurrent)}</RunText>
      </InfoRow>
      <RunList>
        {runs.map((run, index) => (
          <InfoRow key={`run__${index}`}>
            <RunText
              type={
                runs.length === 1
                  ? 'normal'
                  : run == best
                  ? 'best'
                  : run == worst
                  ? 'worst'
                  : 'normal'
              }
            >
              {index + 1}
            </RunText>
            <RunText
              type={
                runs.length === 1
                  ? 'normal'
                  : run == best
                  ? 'best'
                  : run == worst
                  ? 'worst'
                  : 'normal'
              }
            >
              {formatDuration(run.duration)}
            </RunText>
          </InfoRow>
        ))}
      </RunList>
    </>
  );
};
