import { createContext } from 'react';
import { State, Dispatch } from './types';

export const SessionContext = createContext<
  | {
      state: State;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);
