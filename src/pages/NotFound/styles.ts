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
`;

export const Content = styled.main`
  max-width: 50rem;
  margin: 1rem auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 7.5rem;
    margin: 1rem 0;
    text-align: center;
    color: #f4ede8;
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
