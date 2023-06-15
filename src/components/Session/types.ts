import { Run } from '../Timer/types';

export type Session = {
  id: number;
  name: string;
  runs: Run[];
};

export type Action =
  | { type: 'newSession'; payload: { name: string; runs: Run[] } }
  | { type: 'saveSession'; payload: Session }
  | { type: 'switchActiveSession'; payload: number }
  | { type: 'addRunToActiveSession'; payload: Run }
  | { type: 'deleteSession'; payload: number };

export type State = {
  activeSession: number;
  sessions: Session[];
};

export type Dispatch = (action: Action) => void;
