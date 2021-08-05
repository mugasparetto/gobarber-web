import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import { FiPower } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Lottie from 'lottie-web';

import { Container, Header, HeaderContent, Profile, Content } from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import animationData from '../../assets/success.json';
import Button from '../../components/Button';

const Success: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const animationDiv = useRef<HTMLDivElement>(null);

  const handleGoBack = useCallback(() => {
    history.replace('/');
  }, [history]);

  const queryParams = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const provider_id = query.get('provider_id');
    const provider_name = query.get('provider_name');
    const date = query.get('date');

    return {
      provider_id,
      provider_name,
      date,
    };
  }, [location.search]);

  useEffect(() => {
    const data = JSON.stringify(animationData);
    const animation = Lottie.loadAnimation({
      container: animationDiv.current!,
      animationData: JSON.parse(data),
      renderer: 'svg',
    });

    return () => {
      animation.stop();
      animation.destroy();
    };
  }, []);

  const formattedDate = useMemo(() => {
    return format(
      Number(queryParams.date!),
      "EEEE',' MMMM do',' yyyy 'at' hha"
    );
  }, [queryParams]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <Link to="/profile">
              <img src={user.avatar_url} alt={user.name} />
            </Link>
            <div>
              <Link to="/profile">
                <span>Welcome,</span>
              </Link>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <div ref={animationDiv} />
        <h1>Booking confirmed!</h1>
        <p>
          You have booked an appointment with{' '}
          <strong>{queryParams.provider_name}</strong>
          <br />
          on {formattedDate}
        </p>
        <Button onClick={handleGoBack}>Go back</Button>
      </Content>
    </Container>
  );
};

export default Success;
