import { useSelector } from 'react-redux';
import Layout from '../components/Layout/Main/Main';
import Loader from '../components/Layout/Loader/Loader';
import EnvSelector from '../components/EnvSelector/EnvSelector';
import SiteList from '../components/Site/SIteList/SiteList';
import Menu from '../components/Menu/Menu';
import EnvListDialog from '../components/Dialog/EnvDialog/EnvListDialog/EnvListDialog';
import EnvEditDialog from '../components/Dialog/EnvDialog/EnvEditDialog/EnvEditDialog';
import EnvDeleteDialog from '../components/Dialog/EnvDialog/EnvDeleteDialog/EnvDeleteDialog';

export default () => {
  const environment = useSelector(state => state.environment);

  return (
    <Layout>
      <EnvListDialog />
      <EnvEditDialog />
      <EnvDeleteDialog />
      <EnvSelector />
      <Loader isLoading={ environment.isLoading } />
      <SiteList />
      <Menu />
    </Layout>
  );
}
