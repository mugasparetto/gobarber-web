import React from 'react';
import {
  RouteProps as ReactRouteProps,
  Route as ReactRoute,
  Redirect,
} from 'react-router-dom';

interface RouteProps extends ReactRouteProps {
  component: React.ComponentType;
}

interface LocationState {
  bookingSucceeded: boolean;
}

const SuccessRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <ReactRoute
      {...rest}
      render={({ location }) => {
        if (location.state) {
          const state = location.state as LocationState;
          return state.bookingSucceeded ? (
            <Component />
          ) : (
            <Redirect
              to={{
                pathname: '/404',
              }}
            />
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: '/404',
              }}
            />
          );
        }
      }}
    />
  );
};

export default SuccessRoute;
