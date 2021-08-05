import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.5rem;
  }

  ${(props) =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    font-size: 1rem;

    &::placeholder {
      color: #666360;
      font-size: 1rem;
    }
  }

  svg {
    margin-right: 1rem;
  }
`;

export const ErrorMessage = styled.span`
  display: flex;
  align-items: center;
  margin: 0.5rem 0 1.5rem;
  color: #c53030;
  font-size: 0.875rem;

  svg {
    margin-right: 0.5rem;
    font-size: 0.875rem;
  }
`;
