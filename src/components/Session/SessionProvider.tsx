import { PropsWithChildren } from 'react';
import { useImmerReducer } from 'use-immer';
import { sessionReducer, initialState } from './sessionReducer';
import { SessionContext } from './SessionContext';

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useImmerReducer(sessionReducer, initialState);
  const value = { state, dispatch };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
