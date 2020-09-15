import React, { useEffect } from 'react';
import Layout from '../container/Layout';
import PrivateRoute from '../components/PrivateRoute';
import { 
  DashboardPage, 
  CustomerIndividual, 
  CustomerCompanies,
  TransactionalReports,
  TransactionIndividual,
  TransactionCompanies
} from "../container/Pages/asyncpages";
import { Switch, Route } from 'react-router-dom';
import application from '../config/application';
import { Button } from '@material-ui/core';
import NotFound from './NotFound';

const SecureRoutes = ({ history }) => {
  const securePath = application.privatePath;

  // useEffect(() => {
  //   if (!localStorage.getItem('token')){
  //     window.location = '/login';
  //   }
  // }, []);

  return (
    <Layout history={history}>
      <Switch>
        <PrivateRoute exact path={`${securePath}`} component={DashboardPage} />
        <PrivateRoute path={`${securePath}/dashboard`} component={DashboardPage} />
        <PrivateRoute path={`${securePath}/customer/individual`} component={CustomerIndividual} />
        <PrivateRoute path={`${securePath}/customer/companies`} component={CustomerCompanies} />
        <PrivateRoute path={`${securePath}/financial-management/transaction-reports`} component={TransactionalReports} />
        <PrivateRoute path={`${securePath}/transaction/individual`} component={TransactionIndividual} />
        <PrivateRoute path={`${securePath}/transaction/companies`} component={TransactionCompanies} />

        {/* 
        <PrivateRoute path={`${securePath}/transaction/individual`} component={Transaction_Individual} />
        <PrivateRoute path={`${securePath}/transaction/companies`} component={Transaction_Companies} />
        <PrivateRoute path={`${securePath}/financial-management/home`} component={Financial_Home} />
        <PrivateRoute path={`${securePath}/financial-management/request`} component={Financial_Request} />
        <PrivateRoute path={`${securePath}/financial-management/transaction-reports`} component={Financial_Transaction_Reports} />
        <PrivateRoute path={`${securePath}/financial-management/bookkeeping`} component={Financial_Bookkeeping} />
        <PrivateRoute path={`${securePath}/financial-management/journal`} component={Financial_Journal} /> */}

        <Route component={NotFound} />
      </Switch>
    </Layout>
  )
};

export default SecureRoutes;
