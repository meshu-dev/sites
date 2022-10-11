import Head from 'next/head'

import Layout from '../components/Layout/layout';

import SiteBlock from '../components/Site/SiteBlock';
import EnvSelector from '../components/EnvSelector/EnvSelector';

export default () => (
  <Layout>
    <EnvSelector />
    <div>Hello World</div>
    <SiteBlock />
  </Layout>
)
