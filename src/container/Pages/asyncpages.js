import Loadable from 'react-loadable';
import { Loader as Loading } from '../../components/Loader';

export const DashboardPage = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
});
