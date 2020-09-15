import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../container/Layout';
import PrivateRoute from '../components/PrivateRoute';
import {
  DashboardPage,
} from '../container/Pages/asyncpages';
import application from '../config/application';
import NotFound from './NotFound';

const SecureRoutes = ({ history }) => {
  const securePath = application.privatePath;

  return (
    <Layout history={history}>
      {/* PRIVATE PAGE */}
      <Switch>
        <PrivateRoute exact path={`${securePath}`} component={DashboardPage} />
        <PrivateRoute path={`${securePath}/dashboard`} component={DashboardPage} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default SecureRoutes;
