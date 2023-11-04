import Layout from '@/app/components/Layout/Main/Main'
import EnvSelectorSection from '@/app/components/Environment/EnvSelector/EnvSelectorSection'
import SiteList from '@/app/components/Site/SiteList/SiteList'
import MenuButtons from '@/app/components/Menu/MenuButtons/MenuButtons'

export default () => {
  //const dispatch = useDispatch();
  //const mainState = useSelector(state => state.main);

  return(
    <Layout>
      <EnvSelectorSection />
      <SiteList />
      <MenuButtons />
    </Layout>
  );
  return (null);
}
