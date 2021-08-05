import React from 'react';
import { Switch, Route as ReactRoute } from 'react-router-dom';

import Route from './Route';
import SuccessRoute from './SuccessRoute';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import DashboardBarber from '../pages/DashboardBarber';
import DashboardCustomer from '../pages/DashboardCustomer';
import Profile from '../pages/Profile';
import Success from '../pages/Success';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/customer" exact component={DashboardCustomer} isPrivate />
      <Route path="/barber" component={DashboardBarber} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <SuccessRoute path="/customer/success" exact component={Success} />

      <ReactRoute component={NotFound} />
    </Switch>
  );
};

export default Routes;
