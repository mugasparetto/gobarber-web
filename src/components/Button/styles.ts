import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  color: #312e38;
  height: 3.5rem;
  border-radius: 0.5rem;
  border: 0;
  padding: 1rem;
  width: 100%;
  font-weight: 600;
  margin-top: 1rem;
  transition: background-color 0.2s;
  font-size: 1rem;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }

  &:disabled {
    background: ${shade(0.3, '#ff9000')};
    cursor: auto;
  }
`;
