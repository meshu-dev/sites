import { useState } from 'react';
import Layout from '../components/Layout/layout';
import EnvSelector from '../components/EnvSelector/EnvSelector';
import SiteBlock from '../components/Site/SiteBlock';

export default () => {
  const [selectedEnv, setSelectedEnv] = useState(0);

  const onEnvChange = (envId) => {
    console.log('onEnvChange', envId);
    setSelectedEnv(envId);
  }

  return (
    <Layout>
      <EnvSelector onEnvChangeFtn={ onEnvChange } />
      <SiteBlock envId={ selectedEnv } />
    </Layout>
  );
}
