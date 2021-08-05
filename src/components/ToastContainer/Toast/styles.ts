import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasdescription: number;
}

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 22.5rem;
  position: relative;
  padding: 1rem 2rem 1rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  @media all and (max-width: 26.6em) {
    width: calc(100vw - 2rem);
  }

  ${(props) => toastTypeVariations[props.type || 'info']}

  & + div {
    margin-top: 0.5rem;
  }

  > svg {
    margin: 0.25rem 1rem 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 0.25rem;
      font-size: 0.875rem;
      opacity: 0.8;
      line-height: 1.25rem;
    }

    strong {
      font-size: 1rem;
    }
  }

  button {
    position: absolute;
    right: 1rem;
    top: 1rem;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${(props) =>
    !props.hasdescription &&
    css`
      align-items: center;
      svg {
        margin-top: 0;
      }
    `}
`;
