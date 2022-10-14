import { useState } from 'react';
import Layout from '../components/Layout/layout';
import EnvSelector from '../components/EnvSelector/EnvSelector';
import SiteList from '../components/Site/SiteList';

export default () => {
  const [selectedEnv, setSelectedEnv] = useState(0);

  const onEnvChange = (envId) => {
    if (envId) console.log('index.js - onEnvChange', envId);
    setSelectedEnv(envId);
  }

  return (
    <Layout>
      <EnvSelector onEnvChangeFtn={ onEnvChange } />
      <SiteList envId={ selectedEnv } />
    </Layout>
  );
}
