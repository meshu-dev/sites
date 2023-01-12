import Layout from '../components/Layout/Main/Main';
import EnvSelectorSection from '../components/Environment/EnvSelector/EnvSelectorSection';
import SiteList from '../components/Site/SiteList/SiteList';
import MenuButtons from '../components/Menu/MenuButtons/MenuButtons';

export default () => {
  return (
    <Layout>
      <EnvSelectorSection />
      <SiteList />
      <MenuButtons />
    </Layout>
  );
}
