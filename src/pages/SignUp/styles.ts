import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signupBackgroundImg from '../../assets/signup-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  flex: 1;

  @media all and (max-height: 48.125em) {
    padding: 2rem 0;
    justify-content: flex-start;
  }
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opactiry: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 4rem 0;
    width: 21.5rem;
    text-align: center;

    @media all and (max-height: 48.75em) {
      margin: 2rem 0;
    }

    @media all and (max-width: 26.25em) {
      padding: 0 2rem;
      width: auto;
    }

    h1 {
      margin-bottom: 1.5rem;
      font-size: 2rem;

      @media all and (max-width: 26.25em) {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
    }
  }

  > a {
    color: #ff9000;
    margin-top: 1.5rem;
    text-decoration: none;
    transition: color 0.2s;
    font-size: 1rem;

    display: flex;
    align-items: center;

    svg {
      margin-right: 1rem;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signupBackgroundImg}) no-repeat center;
  background-size: cover;

  @media all and (max-width: 50em) {
    display: none;
  }
`;
