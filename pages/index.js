import { useSelector } from 'react-redux';
import Layout from '../components/Layout/Main/Main';
import Loader from '../components/Layout/Loader/Loader';
import EnvSelector from '../components/Environment/EnvSelector/EnvSelector';
import SiteList from '../components/Site/SiteList/SiteList';
import Menu from '../components/Menu/Menu';
import EnvListDialog from '../components/Environment/EnvDialog/EnvListDialog/EnvListDialog';
import EnvAddDialog from '../components/Environment/EnvDialog/EnvFormDialog/EnvAddDialog';
import EnvEditDialog from '../components/Environment/EnvDialog/EnvFormDialog/EnvEditDialog';
import EnvDeleteDialog from '../components/Environment/EnvDialog/EnvDeleteDialog/EnvDeleteDialog';
import SiteAddDialog from '../components/Site/SiteDialog/SiteFormDialog/SiteAddDialog';
import SiteEditDialog from '../components/Site/SiteDialog/SiteFormDialog/SiteEditDialog';
import SiteDeleteDialog from '../components/Site/SiteDialog/SiteDeleteDialog/SiteDeleteDialog';

export default () => {
  const main = useSelector(state => state.main);

  const envDialogs = [
    <EnvListDialog />,
    <EnvAddDialog />,
    <EnvEditDialog />,
    <EnvDeleteDialog />
  ];

  const siteDialogs = [
    <SiteAddDialog />,
    <SiteEditDialog />,
    <SiteDeleteDialog />
  ];

  return (
    <Layout>
      { envDialogs }
      { siteDialogs }
      <EnvSelector />
      <SiteList />
      <Menu />
      <Loader isLoading={ main.isLoading } />
    </Layout>
  );
}
