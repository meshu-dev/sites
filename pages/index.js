import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout/Main/Main';
import EnvSelectorSection from '../components/Environment/EnvSelector/EnvSelectorSection';
import SiteList from '../components/Site/SiteList/SiteList';
import MenuButtons from '../components/Menu/MenuButtons/MenuButtons';
import { mainAction } from '@/store/main-slice';

export default () => {
  //const dispatch = useDispatch();
  //const mainState = useSelector(state => state.main);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
    setIsLoggedIn(isLoggedIn);
  }, []);

  if (isLoggedIn === true) {
    return(
      <Layout>
        <EnvSelectorSection />
        <SiteList />
        <MenuButtons />
      </Layout>
    );
  }
  return (null);
}
