import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

export const Button = styled.button`
  padding: 8px;
  font-size: 20px;
`;

export const TimerText = styled.div`
  font-size: 24px;
  font-weight: bold;
  font-family: sans-serif;
`;

type RunTextType = 'normal' | 'best' | 'worst';

type RunTextProps = {
  type?: RunTextType;
};

const runTextColor: Record<RunTextType, string> = {
  normal: 'var(--foreground-rgb)',
  best: '#65c460',
  worst: '#c46060',
};

export const RunText = styled.p<RunTextProps>`
  font-family: sans-serif;
  color: ${({ type }) => (type ? runTextColor[type] : runTextColor.normal)};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  align-items: center;
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 16px;
`;

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 16px;
`;

export const RunList = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  gap: 16px;
`;
