import { useEffect } from 'react';
import { useRouter } from 'next/router';

const checkUrl = (router) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') || false;
  const path = router.pathname;

  let redirectUrl = '';
  
  if (path === '/' && isLoggedIn === false) {
    redirectUrl = '/login';
  } else if (path === '/login' && isLoggedIn === true) {
    redirectUrl = '/';
  }

  if (redirectUrl) {
    router.push(redirectUrl);
  }
};

export default () => {
  const router = useRouter();

  useEffect(() => {
    checkUrl(router);
  }, []);
};
