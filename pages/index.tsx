import { useState, useEffect } from 'react';
import Layout from '@/app/components/Layout/Main/Main';
import EnvSelectorSection from '@/app/components/Environment/EnvSelector/EnvSelectorSection';
import SiteList from '@/app/components/Site/SiteList/SiteList';
import MenuButtons from '@/app/components/Menu/MenuButtons/MenuButtons';
import { mainAction } from '@/app/store/main-slice';

export default () => {
  //const dispatch = useDispatch();
  //const mainState = useSelector(state => state.main);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = true; //localStorage.getItem('isLoggedIn') === 'true' || false;
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
