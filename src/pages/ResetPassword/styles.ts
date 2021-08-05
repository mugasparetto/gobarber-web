import styled, { keyframes } from 'styled-components';

import signinBackgroundImg from '../../assets/sign-in-background.png';

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

  @media all and (max-height: 43.75em) {
    padding: 2rem 0;
    justify-content: flex-start;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
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

  animation: ${appearFromLeft} 1s;

  form {
    margin: 4rem 0;
    width: 21.5rem;
    text-align: center;

    @media all and (max-height: 48.75em) {
      margin: 2rem, 0;
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
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signinBackgroundImg}) no-repeat center;
  background-size: cover;

  @media all and (max-width: 50em) {
    display: none;
  }
`;
