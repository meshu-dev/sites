import { parseCookies, setCookie, destroyCookie } from 'nookies'
import ApiService from './ApiService';

class AuthService {
  constructor() {
    this.apiService = new ApiService();
  }

  login = async (params) => {
    const apiService = new ApiService();
    const response = await apiService.post('auth/login', params);

    console.log('ApiService response', response);

    if (response['token']) {
      this.setTokenCookie(response['token']);
      return true;
    }
    return false;
  }

  logout = async () => {

  }

  isLoggedIn = () => {
    const cookies = parseCookies();
    return cookies && cookies['authToken'] ? true : false;
  }

  setTokenCookie = (token) => {
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
}

export default AuthService
  