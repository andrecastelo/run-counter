import { useSessions } from './useSessions';
import styled from '@emotion/styled';

const SessionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 16px;
`;

const StyledSessionList = styled.ul`
  list-style-type: none;
`;

export const SessionList = () => {
  const { sessions } = useSessions();

  return (
    <SessionListContainer>
      <StyledSessionList>
        {sessions.map((session) => (
          <li key={`session__${session.id}`}>
            {session.name} - {session.runs.length} total runs
          </li>
        ))}
      </StyledSessionList>
    </SessionListContainer>
  );
};
