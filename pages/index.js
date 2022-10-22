import { useState } from 'react';
import Layout from '../components/Layout/layout';
import Loader from '../components/Loader/Loader';
import EnvSelector from '../components/EnvSelector/EnvSelector';
import SiteList from '../components/Site/SiteList';
import Menu from '../components/Menu/Menu';
import DialogList from '../components/Dialog/DialogList';

export default () => {
  const [selectedEnv, setSelectedEnv] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [menuAction, setMenuAction] = useState('');

  const onEnvChange = (envId) => {
    setSelectedEnv(envId);
  }

  const onLoaded = (isLoading) => {
    setShowLoader(isLoading);
  }

  const onMenuButtonClick = (action) => {
    setMenuAction(action);
  }

  const onDialogClose = () => {
    setMenuAction('');
  }

  return (
    <Layout>
      <DialogList action={ menuAction } onActionChangeFtn={ onDialogClose } />
      <EnvSelector onEnvChangeFtn={ onEnvChange } />
      <Loader isLoading={ showLoader } />
      <SiteList envId={ selectedEnv } onLoadedFtn={ onLoaded } />
      <Menu onClickFtn={ onMenuButtonClick } />
    </Layout>
  );
}
