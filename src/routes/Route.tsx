import React from 'react';
import {
  RouteProps as ReactRouteProps,
  Route as ReactRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={({ location }) => {
        if (isPrivate === !!user) {
          if (
            (location.pathname === '/barber' ||
              location.pathname === '/customer') &&
            location.pathname !== `/${user.role}`
          ) {
            return <Redirect to={`/${user.role}`} />;
          } else {
            return <Component />;
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: isPrivate ? '/' : `/${user.role}`,
              }}
            />
          );
        }
      }}
    />
  );
};

export default Route;
