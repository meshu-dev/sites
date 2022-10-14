import { useState } from 'react';
import Layout from '../components/Layout/layout';
import Loader from '../components/Loader/Loader';
import Menu from '../components/Menu/Menu';
import EnvSelector from '../components/EnvSelector/EnvSelector';
import SiteList from '../components/Site/SiteList';

export default () => {
  const [selectedEnv, setSelectedEnv] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  const onEnvChange = (envId) => {
    setSelectedEnv(envId);
  }

  const onLoaded = (isLoading) => {
    setShowLoader(isLoading);
  }

  const onMenuButtonClick = (isLoading) => {
    console.log('ddd');
  }

  return (
    <Layout>
      <EnvSelector
        onEnvChangeFtn={ onEnvChange } />
      <Loader
        isLoading={ showLoader } />
      <SiteList
        envId={ selectedEnv }
        onLoadedFtn={ onLoaded } />
      <Menu
        onButtonClickFtn={ onMenuButtonClick }/>
    </Layout>
  );
}
