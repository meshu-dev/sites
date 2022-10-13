import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { apiPost } from './apiCall.js';

const setTokenCookie = (token) => {
  setCookie(
    null,
    'authToken',
    token,
    {
      maxAge: 600, // 10 minutes
      path: '/'
    }
  );
}

export const apiLogin = async (email, password) => {
  const response = await apiPost(
    'auth/login',
    { email, password }
  );

  if (response['token']) {
    setTokenCookie(response['token']);
    return true;
  }
  return false;
}
  