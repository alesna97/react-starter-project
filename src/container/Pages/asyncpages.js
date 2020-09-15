import Loadable from 'react-loadable';
import { Loader as Loading } from '../../components/Loader';

export const DashboardPage = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
});

export const CustomerIndividual = Loadable({
  loader: () => import('./Customers/Individual'),
  loading: Loading
});

export const CustomerCompanies = Loadable({
  loader: () => import('./Customers/Companies'),
  loading: Loading
});


export const TransactionalReports = Loadable({
  loader: () => import('./FinancialManagement/TransactionalReports'),
  loading: Loading
});

export const TransactionIndividual = Loadable({
  loader: () => import('./Transactions/Individual'),
  loading: Loading
});

export const TransactionCompanies = Loadable({
  loader: () => import('./Transactions/Companies'),
  loading: Loading
});