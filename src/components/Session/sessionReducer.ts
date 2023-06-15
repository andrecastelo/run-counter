import { Action, State } from './types';

export const initialState: State = {
  activeSession: 0,
  sessions: [{ id: 1, name: 'Sesssion #001', runs: [] }],
};

export const sessionReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'newSession': {
      const totalSessions = state.sessions.length;
      const id =
        totalSessions > 0 ? state.sessions[totalSessions - 1].id + 1 : 1;
      const name =
        action.payload.name || `Session #${id.toFixed().padStart(3, '0')}`;
      const runs = action.payload.runs || [];

      state.sessions.push({ id, name, runs });
      break;
    }

    case 'deleteSession': {
      const id = action.payload;
      state.sessions = state.sessions.filter((s) => s.id === id);
      break;
    }

    case 'saveSession': {
      const session = state.sessions.find((s) => s.id === action.payload.id);
      if (!session) break;
      session.name = action.payload.name;
      session.runs = action.payload.runs;
      break;
    }

    case 'addRunToActiveSession': {
      state.sessions[state.activeSession].runs.push(action.payload);
      break;
    }

    case 'switchActiveSession': {
      const newActiveSessionIndex = action.payload;
      if (newActiveSessionIndex > state.sessions.length) {
        state.activeSession = state.sessions.length;
      } else if (newActiveSessionIndex < 0) {
        state.activeSession = 0;
      } else {
        state.activeSession = newActiveSessionIndex;
      }
      break;
    }

    default: {
      throw new Error(
        `Unhandled action type: ${(action as unknown as any).type}`
      );
    }
  }
};
