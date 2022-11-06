import Layout from '../components/Layout/Main/Main';
import EnvSelectorSection from '../components/Environment/EnvSelector/EnvSelectorSection';
import SiteList from '../components/Site/SiteList/SiteList';
import MenuButton from '../components/Menu/MenuButton';

export default () => {
  return (
    <Layout>
      <EnvSelectorSection />
      <SiteList />
      <MenuButton />
    </Layout>
  );
}
