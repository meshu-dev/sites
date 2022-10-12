import useSWR from 'swr';
import { fetcher, fetcherWithToken } from './fetcherFtns.js';

const apiCall = (method, url, params) => {
  const fetcherParams = {
    method: method,
    params: params
  };

  if (url === 'auth/login') {
    return useSWR([apiUrl, fetcherParams], fetcher);
  }
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
  const token = '24|Hr4x2kc2MCh3sR9kAEH9ZRJOPSLN120Vqm20dwHU';

  fetcherParams['token'] = token;

  console.log('URL', apiUrl);

  return useSWR([apiUrl, fetcherParams], fetcherWithToken);
}

export const apiGet = (url) => {
  return apiCall('GET', url, []);
}

export const apiPost = (url, params) => {
  return apiCall('POST', url, params);
}

export const apiPut = (url, params) => {
  return apiCall('PUT', url, params);
}

export const apiDelete = (url, params) => {
  return apiCall('DELETE', url, params);
}
