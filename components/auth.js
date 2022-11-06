import { parseCookies, setCookie, destroyCookie } from 'nookies'

export const setTokenCookie = (token) => {
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

export const authToken = () => {
  let cookies = parseCookies();

  if (cookies.authToken) {
    return cookies.authToken;
  }
  return null;
}

export const isLoggedIn = () => {
  return authToken() !== null ? true : false;
}
