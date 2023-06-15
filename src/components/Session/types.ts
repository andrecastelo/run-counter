import { Run } from '../Timer/types';

export type Session = {
  id: number;
  name: string;
  runs: Run[];
};

export type Action =
  | { type: 'newSession'; payload: { name: string; runs: Run[] } }
  | { type: 'switchActiveSession'; payload: number }
  | { type: 'renameActiveSession'; payload: string }
  | { type: 'addRunToActiveSession'; payload: Run }
  | { type: 'clearActiveSession' }
  | { type: 'deleteSession'; payload: number };

export type State = {
  activeSession: number;
  sessions: Session[];
};

export type Dispatch = (action: Action) => void;
