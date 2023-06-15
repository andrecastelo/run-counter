import { useContext } from 'react';
import { SessionContext } from './SessionContext';

export const useSessions = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }

  return context;
};
