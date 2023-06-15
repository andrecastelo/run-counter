import { useContext } from 'react';
import { SessionContext } from './SessionContext';
import { Run } from '../Timer/types';

export const useSessions = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }

  const { state, dispatch } = context;

  const activeSession = state.sessions[state.activeSession];

  const saveRun = (run: Run) =>
    dispatch({ type: 'addRunToActiveSession', payload: run });

  const clearRuns = () => dispatch({ type: 'clearActiveSession' });

  const switchActive = (sessionIndex: number) =>
    dispatch({ type: 'switchActiveSession', payload: sessionIndex });

  const rename = (newName: string) =>
    dispatch({ type: 'renameActiveSession', payload: newName });

  return {
    activeSession,
    saveRun,
    clearRuns,
    switchActive,
    rename,
  };
};
