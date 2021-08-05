import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 9rem;
    background: #26262e;

    display: flex;
    align-items: center;

    div {
      max-width: 40rem;
      width: 100%;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 1.5rem;
        height: 1.5rem;

        @media all and (max-width: 40em) {
          margin-left: 1rem;
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: -11.5rem auto 0;

  width: 100%;

  form {
    margin: 5rem 0;
    width: 21.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;

    @media all and (max-width: 26.25em) {
      padding: 0 2rem;
      width: auto;
    }

    h1 {
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 1.5rem;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 2rem;
  position: relative;
  align-self: center;

  img {
    width: 11.625rem;
    height: 11.625rem;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 3rem;
    height: 3rem;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
