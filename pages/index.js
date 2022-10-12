import * as React from 'react';
import Layout from '../components/Layout/layout';
import SiteBlock from '../components/Site/SiteBlock';
import EnvSelector from '../components/EnvSelector/EnvSelector';

const fetcher = (url, token) => fetch(url, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}).then((res) => res.json());

const Index = () => {
  const [selectedEnv, setSelectedEnv] = React.useState(0);

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

export default Index;
