import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Header, HeaderContent, Content } from './styles';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';

const NotFound: React.FC = () => {
  const history = useHistory();

  const handleGoBack = useCallback(() => {
    history.replace('/');
  }, [history]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
        </HeaderContent>
      </Header>
      <Content>
        <h1>404</h1>
        <p>This page does not exist.</p>
        <Button onClick={handleGoBack}>Go to main page</Button>
      </Content>
    </Container>
  );
};

export default NotFound;
