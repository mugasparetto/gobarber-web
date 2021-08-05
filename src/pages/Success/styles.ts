import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 2rem 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 2rem;

  @media all and (max-width: 31.25em) {
    padding: 0 1rem;
  }

  > img {
    height: 5rem;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;

  @media all and (max-width: 31.25em) {
    margin-left: auto;
  }

  a {
    text-decoration: none;
  }

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;

    @media all and (max-width: 24em) {
      display: none;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    line-height: 1.5rem;

    @media all and (max-width: 24em) {
      margin-left: 0;
    }

    span {
      color: #f4ede8;
      font-size: 1rem;
    }

    strong {
      color: #ff9000;
      font-size: 1rem;
    }
  }
`;

export const Content = styled.main`
  max-width: 50rem;
  margin: 1rem auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    margin: 1rem 0;
    text-align: center;
    color: #f4ede8;
    font-size: 2rem;
  }

  p {
    text-align: center;
    color: #999591;
    font-size: 1rem;
  }

  button {
    margin-top: 3rem;
    max-width: 16.5rem;
  }

  @media all and (max-width: 55.625em) {
    flex-direction: column;
    margin: 2rem auto;
  }

  @media all and (max-width: 31.25em) {
    padding: 0 1rem;
  }
`;
