import useSWR from 'swr';
import { fetcherWithToken } from './fetcherFtns.js';
import { authToken } from './auth.js';

const apiHook = (url, params) => {
  if (url) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
    const token = authToken();
  
    const fetcherParams = {
      method: 'GET',
      params: params,
      token: token
    };
    console.log('URL', apiUrl);
  
    return useSWR([apiUrl, fetcherParams], fetcherWithToken);
  }

  return {
    data: null,
    error: ''
  };
}

export default apiHook;
