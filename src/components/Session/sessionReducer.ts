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
      if (state.sessions.length < 1) break;
      state.sessions = state.sessions.filter((s) => s.id === id);
      break;
    }

    case 'renameActiveSession': {
      state.sessions[state.activeSession].name = action.payload;
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

    case 'clearActiveSession': {
      state.sessions[state.activeSession].runs = [];
      break;
    }

    default: {
      throw new Error(
        `Unhandled action type: ${(action as unknown as any).type}`
      );
    }
  }
};
